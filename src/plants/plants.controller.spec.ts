import { Test, TestingModule } from '@nestjs/testing';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { Plant } from './entities/plant.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlantsController', () => {
  let controller: PlantsController;
  let plantsRepository: Repository<Plant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantsController],
      providers: [
        PlantsService,
        {
          provide: getRepositoryToken(Plant),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PlantsController>(PlantsController);
    plantsRepository = module.get<Repository<Plant>>(getRepositoryToken(Plant));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
