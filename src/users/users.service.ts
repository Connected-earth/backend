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
import {Item} from "../items/entities/item.entity";

/*
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
    return this.usersRepository.find();
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
*/

// For test purpose
@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      email: 'john@gmail.com',
      password: 'changeme',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      username: 'maria',
      email: 'maria@gmail.com',
      password: 'guess',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
