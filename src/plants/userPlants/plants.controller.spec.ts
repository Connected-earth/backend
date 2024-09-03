/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file plants.controller.specs.ts
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
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { Plant } from './entities/plant.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserPlantsLinkedGeneralPlantsViewEntity } from './entities/userPlantsLinkedGeneralPlants.viewEntity';
import { SensorsLinkedPlantView } from '../../sensors/entities/sensorsLinkedPlant.viewEntity';

describe('PlantsController', () => {
  let controller: PlantsController;
  let plantsRepository: Repository<Plant>;
  let userPlantsLinkedGeneralPlants: Repository<UserPlantsLinkedGeneralPlantsViewEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantsController],
      providers: [
        PlantsService,
        {
          provide: getRepositoryToken(Plant),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserPlantsLinkedGeneralPlantsViewEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PlantsController>(PlantsController);
    plantsRepository = module.get<Repository<Plant>>(getRepositoryToken(Plant),
      );

    userPlantsLinkedGeneralPlants = module.get<
      Repository<UserPlantsLinkedGeneralPlantsViewEntity>
    >(getRepositoryToken(SensorsLinkedPlantView),
      );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
