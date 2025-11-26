import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { RoleSeeder } from './role.seed';
import { UserSeeder } from './user.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const arg = process.argv[2]; // argument after "npm run seed"

  const roleSeeder = app.get(RoleSeeder);
  const userSeeder = app.get(UserSeeder);

  // If no argument → run all seeders
  if (!arg) {
    console.log("Running ALL seeders...\n");
    await roleSeeder.run();
    await userSeeder.run();
  }

  // Only role seeder
  if (arg === "role") {
    await roleSeeder.run();
  }

  // Only user seeder
  if (arg === "user") {
    await userSeeder.run();
  }

  await app.close();
}

bootstrap();
