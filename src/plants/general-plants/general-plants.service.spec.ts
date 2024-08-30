import { Test, TestingModule } from '@nestjs/testing';
import { GeneralPlantsService } from './general-plants.service';
import { Repository } from 'typeorm';
import { GeneralPlant } from './entities/general-plant.entity';
import { GeneralPlantsController } from './general-plants.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GeneralPlantsModule } from './general-plants.module';

describe('GeneralPlantsService', () => {
  let service: GeneralPlantsService;
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

    service = module.get<GeneralPlantsService>(GeneralPlantsService);
    generalPlantsRepository = module.get<Repository<GeneralPlant>>(
      getRepositoryToken(GeneralPlant),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
