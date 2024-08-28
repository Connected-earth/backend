import { Test, TestingModule } from '@nestjs/testing';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { Repository } from 'typeorm';

describe('SensorsController', () => {
  let controller: SensorsController;
  let sensorsRepository: Repository<Sensor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorsController],
      providers: [
        SensorsService,
        {
          provide: getRepositoryToken(Sensor),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<SensorsController>(SensorsController);
    sensorsRepository = module.get<Repository<Sensor>>(
      getRepositoryToken(Sensor),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
