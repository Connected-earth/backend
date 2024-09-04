/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file plants.service.specs.ts
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
import { PlantsService } from './plants.service';
import { Repository } from 'typeorm';
import { Plant } from './entities/plant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserPlantsLinkedGeneralPlantsViewEntity } from './entities/userPlantsLinkedGeneralPlants.viewEntity';

describe('PlantsService', () => {
  let service: PlantsService;
  let plantsRepository: Repository<Plant>;
  let userPlantsLinkedGeneralPlants: Repository<UserPlantsLinkedGeneralPlantsViewEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<PlantsService>(PlantsService);
    plantsRepository = module.get<Repository<Plant>>(getRepositoryToken(Plant),
      );
    userPlantsLinkedGeneralPlants = module.get<
      Repository<UserPlantsLinkedGeneralPlantsViewEntity>
    >(getRepositoryToken(UserPlantsLinkedGeneralPlantsViewEntity),);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
