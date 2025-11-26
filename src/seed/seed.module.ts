import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Role, RoleSchema } from '../role/role.schema';
import { User, UserSchema } from '../users/user.schema';

import { RoleSeeder } from './role.seed';
import { UserSeeder } from './user.seed';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [RoleSeeder, UserSeeder],
  exports: [RoleSeeder, UserSeeder],
})
export class SeedModule {}
