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

import { Injectable } from '@nestjs/common';
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

  async create(createSensorDto: CreateSensorDto): Promise<ObjectLiteral> {
    /*
    const result = (await this.sensorsRepository.insert(createSensorDto))
      .generatedMaps[0];

    return result;
    */

    return this.sensorsRepository.save(createSensorDto);
  }

  findAll(): Promise<Sensor[]> {
    return this.sensorsRepository.find();
  }

  findOne(id: number): Promise<Sensor | null> {
    return this.sensorsRepository.findOneBy({ id });
  }

  async update(id: number, updateSensorDto: UpdateSensorDto): Promise<void> {
    await this.sensorsRepository.update(+id, updateSensorDto);
  }

  async remove(id: number): Promise<void> {
    await this.sensorsRepository.delete(+id);
  }

  findLinkedPlants(sensorId: number) {
    return this.sensorsLinkedPlantView.findOneBy({ sensorId });
  }
}
