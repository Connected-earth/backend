/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file users.controller.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findUserWithJwt(@Request() req: any) {
    return this.findOne(req.user.id);
  }

  @Get('sensors')
  @UseGuards(JwtAuthGuard)
  async findUserRealtedSensors(@Request() req: any) {
    const user = (await this.findOne(req.user.id)) as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.sensors;
  }

  @Get('plants')
  @UseGuards(JwtAuthGuard)
  async findUserRealtedPlants(@Request() req: any) {
    const user = (await this.findOne(req.user.id)) as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.plants;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':email')
  findOneByMail(@Param('email') email: string) {
    return this.usersService.findOneByMail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
