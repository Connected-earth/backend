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

import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  create(createPlantDto: CreatePlantDto) {
    return this.plantsRepository.save(createPlantDto);
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
    const plant = (await this.findOne(id)) as Plant;

    if (!plant) {
      throw new UnauthorizedException(
        'Plant does not exist. You need to create it before updating it',
      );
    }

    return this.plantsRepository.save({ ...plant, ...updatePlantDto });
  }

  async remove(id: number) {
    await this.plantsRepository.delete(+id);
  }
}
