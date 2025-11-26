import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async run() {
    console.log(" Seeding started...");

    await this.userModel.deleteMany({});

    await this.userModel.create([
      {
        name: "Admin",
        email: "admin@example.com",
        password: "123456",
        role: "admin",
      },
      {
        name: "Normal User",
        email: "user@example.com",
        password: "123456",
        role: "user",
      },
      {
        name: "Naveen Kumar",
        email: "naveen@gmail",
        password: "12345",
        role: "user"
      }
    ]);

    console.log(" Seeding completed!");
  }
}
