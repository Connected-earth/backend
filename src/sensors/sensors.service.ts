import { Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private sensorsRepository: Repository<Sensor>,
  ) {}

  async create(createSensorDto: CreateSensorDto): Promise<void> {
    await this.sensorsRepository.insert(createSensorDto);
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
}
