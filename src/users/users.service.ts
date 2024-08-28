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

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.usersRepository.insert(createUserDto);
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(+id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(+id);
  }
}
