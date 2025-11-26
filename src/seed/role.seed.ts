import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../role/role.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

async run() {
  console.log("Seeding Roles...");

  const roles = ["admin", "user", "student"];

  // Create or confirm each role
  for (const role of roles) {
    const exists = await this.roleModel.findOne({ name: role });
    if (!exists) {
      await this.roleModel.create({ name: role });
      console.log(`✔ Role created: ${role}`);
    } else {
      console.log(`✔ Role already exists: ${role}`);
    }
  }

  // DELETE ROLES NOT IN THE LIST
  await this.roleModel.deleteMany({
    name: { $nin: roles },
  });

  console.log("🧹 Removed roles not in seed list");
  console.log("Role seeding completed!\n");
}

}
