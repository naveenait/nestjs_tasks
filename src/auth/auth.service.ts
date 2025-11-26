import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MESSAGES } from './constants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    try {
      const exists = await this.userService.findByEmail(data.email);
      if (exists) {
        return { message: MESSAGES.USER_EXISTS };
      }

      const user = await this.userService.create(data);

      return {
        message: MESSAGES.USER_CREATED,
        user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(data: any) {
    try {
      const user = await this.userService.findByEmail(data.email);

      if (!user) {
        return { message: MESSAGES.USER_NOT_FOUND };
      }

     const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      return { message: MESSAGES.INVALID_CREDENTIALS };
    }

      const payload = {
        email: user.email,
        role: user.role,
        sub: user._id,
      };

      const token = this.jwtService.sign(payload);

      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      return {
        message: MESSAGES.LOGIN_SUCCESS,
        userName: userData.name,
        token,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
