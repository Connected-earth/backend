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

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon from 'argon2';
import { tokens } from '../tokens/tokens.array';
import { Token } from '../tokens/entities/token.entity';

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
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneByMail(email: string): Promise<User | null> {
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

  async findOneByHash(hash: string) {
    const token = tokens.find((token) => token.hash === hash) as Token;

    Logger.log(hash);
    Logger.log(tokens);

    Logger.log(token);

    if (!token) {
      throw new UnauthorizedException('This token does not exist');
    }

    return (await this.findOne(token.id)) as User;
  }
}
