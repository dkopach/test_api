import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UsersService } from '../../../models/users/users.service';
import { EditUserDto } from '../../../models/users/dto/edit-user.dto';

@ApiTags('admin/users')
@Controller('admin/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async list() {
    return this.usersService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.usersService.get(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Body() inputs: EditUserDto, @Param('id') id: number) {
    return this.usersService.update(id, inputs);
  }
}
