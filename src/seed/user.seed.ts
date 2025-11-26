import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async run() {
    console.log(" Seeding Users...");

    const users = [
      {
        name: "Admin",
        email: "admin@example.com",
        password: "123456",
        role: "admin",
      },
      {
        name: "Naveen Kumar",
        email: "naveen@gmail",
        password: "12345",
        role: "user",
      },
      {
        name: "Arun",
        email: "arun@gmail",
        password: "58231",
        role: "admin",
      },
      {
        name: "Tamil selvan",
        email: "tamil@gmail",
        password: "461823",
        role: "user",
      },
    ];

    // 1️⃣ Upsert new/updated users
    for (const user of users) {
      await this.userModel.updateOne(
        { email: user.email },
        { $set: user },
        { upsert: true }
      );
      console.log(`✔ User synced: ${user.email}`);
    }

    const emails = users.map(u => u.email);

    // const deleteResult = await this.userModel.deleteMany({
    //   email: { $nin: emails }
    // });

    // if (deleteResult.deletedCount > 0) {
    //   console.log(`🗑 Deleted ${deleteResult.deletedCount} removed users.`);
    // }

    console.log("User seeding completed!\n");
  }
}
