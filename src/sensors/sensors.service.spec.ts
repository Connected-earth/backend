import { Test, TestingModule } from '@nestjs/testing';
import { SensorsService } from './sensors.service';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SensorsService', () => {
  let service: SensorsService;
  let sensorsRepository: Repository<Sensor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorsService,
        {
          provide: getRepositoryToken(Sensor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SensorsService>(SensorsService);
    sensorsRepository = module.get<Repository<Sensor>>(
      getRepositoryToken(Sensor),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
