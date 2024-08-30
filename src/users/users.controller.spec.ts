/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file users.controller.spec.ts
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
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plant } from '../plants/userPlants/entities/plant.entity';
import { Sensor } from '../sensors/entities/sensor.entity';
import { PlantsService } from '../plants/userPlants/plants.service';
import { SensorsService } from '../sensors/sensors.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersRepository: Repository<User>;
  let plantsRepository: Repository<Plant>;
  let sensorsRepository: Repository<Sensor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        PlantsService,
        {
          provide: getRepositoryToken(Plant),
          useClass: Repository,
        },
        SensorsService,
        {
          provide: getRepositoryToken(Sensor),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    plantsRepository = module.get<Repository<Plant>>(getRepositoryToken(Plant));
    sensorsRepository = module.get<Repository<Sensor>>(
      getRepositoryToken(Sensor),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
