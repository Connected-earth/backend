/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file general-plants.service.ts
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
import { CreateGeneralPlantDto } from './dto/create-general-plant.dto';
import { UpdateGeneralPlantDto } from './dto/update-general-plant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralPlant } from './entities/general-plant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneralPlantsService {
  constructor(
    @InjectRepository(GeneralPlant)
    private generalPlantsRepository: Repository<GeneralPlant>,
  ) {}

  create(createGeneralPlantDto: CreateGeneralPlantDto) {
    return this.generalPlantsRepository.save(createGeneralPlantDto);
  }

  findAll(): Promise<GeneralPlant[]> {
    return this.generalPlantsRepository.find();
  }

  findOne(id: number): Promise<GeneralPlant | null> {
    return this.generalPlantsRepository.findOneBy({ id });
  }

  async update(id: number, updateGeneralPlantDto: UpdateGeneralPlantDto) {
    const plant = (await this.findOne(id)) as GeneralPlant;

    if (!plant) {
      throw new UnauthorizedException(
        'GeneralPlant does not exist. You need to create it before updating it',
      );
    }

    return this.generalPlantsRepository.save({
      ...plant,
      ...updateGeneralPlantDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.generalPlantsRepository.delete(+id);
  }
}
