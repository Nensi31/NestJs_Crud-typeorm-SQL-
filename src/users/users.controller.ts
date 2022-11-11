import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('all')
  getall() {
    console.log('res');
    return this.service.getUsers();
  }
  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post('create')
  create(@Body() user: User) {
    return this.service.createUser(user);
  }

  @Put(':id')
  update(@Param() id: number, @Body() user: User) {
    // @ts-ignore
    return this.service.updateUser(user.id);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
