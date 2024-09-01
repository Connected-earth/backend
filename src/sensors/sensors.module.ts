/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file sensors.module.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorsLinkedPlantView } from './entities/sensorsLinkedPlant.viewEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor, SensorsLinkedPlantView])],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}
