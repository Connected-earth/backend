import { Test, TestingModule } from '@nestjs/testing';
import { GeneralPlantsController } from './general-plants.controller';
import { GeneralPlantsService } from './general-plants.service';
import { Repository } from 'typeorm';
import { GeneralPlant } from './entities/general-plant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GeneralPlantsModule } from './general-plants.module';

describe('GeneralPlantsController', () => {
  let controller: GeneralPlantsController;
  let generalPlantsRepository: Repository<GeneralPlant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralPlantsController],
      providers: [
        GeneralPlantsService,
        {
          provide: getRepositoryToken(GeneralPlant),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<GeneralPlantsController>(GeneralPlantsController);
    generalPlantsRepository = module.get<Repository<GeneralPlant>>(
      getRepositoryToken(GeneralPlant),
    );
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
