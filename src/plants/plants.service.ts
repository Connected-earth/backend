/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file plants.service.ts
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
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from './entities/plant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private plantsRepository: Repository<Plant>,
  ) {}

  async create(createPlantDto: CreatePlantDto): Promise<void> {
    await this.plantsRepository.insert(createPlantDto);
  }

  findAll(): Promise<Plant[]> {
    return this.plantsRepository.find({
      relations: {
        sensor: true,
      },
    });
  }

  findOne(id: number): Promise<Plant | null> {
    return this.plantsRepository.findOneBy({ id });
  }

  async update(id: number, updatePlantDto: UpdatePlantDto) {
    await this.plantsRepository.update(+id, updatePlantDto);
  }

  async remove(id: number) {
    await this.plantsRepository.delete(+id);
  }
}
