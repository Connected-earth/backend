/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file sensors.service.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { InsertResult, ObjectLiteral, Repository } from 'typeorm';
import { SensorsLinkedPlantView } from './entities/sensorsLinkedPlant.viewEntity';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private sensorsRepository: Repository<Sensor>,
    @InjectRepository(SensorsLinkedPlantView)
    private sensorsLinkedPlantView: Repository<SensorsLinkedPlantView>,
  ) {}

  create(createSensorDto: CreateSensorDto) {
    return this.sensorsRepository.save(createSensorDto);
  }

  findAll(): Promise<Sensor[]> {
    return this.sensorsRepository.find();
  }

  findOne(id: number): Promise<Sensor | null> {
    return this.sensorsRepository.findOneBy({ id });
  }

  async update(id: number, updateSensorDto: UpdateSensorDto) {
    const sensor = (await this.findOne(id)) as Sensor;

    if (!sensor) {
      throw new UnauthorizedException(
        'Sensor does not exist. You need to create it before updating it',
      );
    }

    return this.sensorsRepository.save({ ...sensor, ...updateSensorDto });
  }

  async remove(id: number): Promise<void> {
    await this.sensorsRepository.delete(+id);
  }

  findLinkedPlants(sensorId: number) {
    return this.sensorsLinkedPlantView.findOneBy({ sensorId });
  }
}
