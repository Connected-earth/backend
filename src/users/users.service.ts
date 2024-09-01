/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file users.service.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = await argon.hash(createUserDto.password);
    createUserDto.password = password;
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        sensors: true,
        plants: true,
      },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByMail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = (await this.findOne(id)) as User;

    if (!user) {
      throw new UnauthorizedException(
        'User does not exist. You need to create it before updating it',
      );
    }

    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(+id);
  }
}
