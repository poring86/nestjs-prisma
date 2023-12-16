import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@Param() param) {
    return { user: {}, param };
  }

  @Put(':id')
  async update(@Param() params, @Body() body: UpdatePutUserDTO) {
    return {
      method: 'put',
      body,
      params,
    };
  }

  @Patch(':id')
  async patch(@Param() params, @Body() body: UpdatePatchUserDTO) {
    return {
      method: 'patch',
      body,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return {
      id,
    };
  }
}
