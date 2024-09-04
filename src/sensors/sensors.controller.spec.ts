/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file sensors.controller.spec.ts
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
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { Repository } from 'typeorm';
import { SensorsLinkedPlantView } from './entities/sensorsLinkedPlant.viewEntity';
import { UserPlantsLinkedGeneralPlantsViewEntity } from '../plants/userPlants/entities/userPlantsLinkedGeneralPlants.viewEntity';
import { MailService } from '../mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

describe('SensorsController', () => {
  let controller: SensorsController;
  let sensorsRepository: Repository<Sensor>;
  let sensorsLinkedPlant: Repository<SensorsLinkedPlantView>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorsController],
      providers: [
        SensorsService,
        {
          provide: getRepositoryToken(Sensor),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(SensorsLinkedPlantView),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserPlantsLinkedGeneralPlantsViewEntity),
          useClass: Repository,
        },
        MailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<SensorsController>(SensorsController);
    sensorsRepository = module.get<Repository<Sensor>>(
      getRepositoryToken(Sensor),
    );
    sensorsLinkedPlant = module.get<Repository<SensorsLinkedPlantView>>(
      getRepositoryToken(SensorsLinkedPlantView),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
