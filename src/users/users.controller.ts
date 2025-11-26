import { 
  Controller, Get, Post, Body, Param, Delete, Patch, Put 
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // FULL UPDATE (PUT)
  @Put(':id')
  replace(@Param('id') id: string, @Body() body: any) {
    return this.usersService.replace(id, body);
  }

  // PARTIAL UPDATE (PATCH)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
