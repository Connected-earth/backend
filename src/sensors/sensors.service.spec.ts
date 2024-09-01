/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file sensors.service.spec.ts
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
import { SensorsService } from './sensors.service';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SensorsLinkedPlantView } from './entities/sensorsLinkedPlant.viewEntity';

describe('SensorsService', () => {
  let service: SensorsService;
  let sensorsRepository: Repository<Sensor>;
  let sensorsLinkedPlant: Repository<SensorsLinkedPlantView>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<SensorsService>(SensorsService);
    sensorsRepository = module.get<Repository<Sensor>>(
      getRepositoryToken(Sensor),
    );
    sensorsLinkedPlant = module.get<Repository<SensorsLinkedPlantView>>(
      getRepositoryToken(SensorsLinkedPlantView),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
