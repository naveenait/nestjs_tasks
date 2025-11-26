import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() body: any) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post("login")
  async login(@Body() body: any) {
    try {
      return await this.authService.login(body);
    } catch (error) {
      return { error: error.message };
    }
  }
}
