import { Test, TestingModule } from '@nestjs/testing';
import { GeneralPlantsController } from './general-plants.controller';
import { GeneralPlantsService } from './general-plants.service';

describe('GeneralPlantsController', () => {
  let controller: GeneralPlantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralPlantsController],
      providers: [GeneralPlantsService],
    }).compile();

    controller = module.get<GeneralPlantsController>(GeneralPlantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
