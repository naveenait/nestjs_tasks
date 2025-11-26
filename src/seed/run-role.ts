import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { RoleSeeder } from './role.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const seeder = app.get(RoleSeeder);
  await seeder.run();
  await app.close();
}

bootstrap();
