/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file users.service.spec.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { createTestDataSource } from '../../test/test-utils';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = await createTestDataSource();
    usersRepository = dataSource.getRepository(User);
  });
  afterAll(async () => {
    await dataSource.destroy();
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('update username', async () => {
    const user = new User();
    user.username = 'oldUsername';
    user.email = 'test@test.com';
    user.password = 'changeme';
    user.role = 'Admin';
    const userCreated = await service.create(user);
    const updateUserDto = { username: 'newUsername' };
    const result = await service.update(userCreated.id, updateUserDto);

    expect(result.username).toBe('newUsername');
  });
  it('find user by email', async () => {
    const user = new User();

    user.username = 'oldUsername';
    user.email = 'test@email.com';
    user.password = 'changeme';
    user.role = 'Admin';

    const createdUser = await service.create(user);
    const result = await service.findOneByMail(createdUser.email);

    expect(result?.email).toEqual(createdUser.email);
  });
});
