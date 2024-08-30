import { Test, TestingModule } from '@nestjs/testing';
import { GeneralPlantsService } from './general-plants.service';

describe('GeneralPlantsService', () => {
  let service: GeneralPlantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralPlantsService],
    }).compile();

    service = module.get<GeneralPlantsService>(GeneralPlantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
