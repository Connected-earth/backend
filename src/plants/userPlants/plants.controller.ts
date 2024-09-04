/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file plants.controller.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { Plant } from './entities/plant.entity';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  create(@Body() createPlantDto: CreatePlantDto) {
    return this.plantsService.create(createPlantDto);
  }

  @Get()
  findAll() {
    return this.plantsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req: any) {
    const plant = (await this.plantsService.findOne(+id)) as Plant;
    if (!plant) {
      throw new UnauthorizedException('Plant not found');
    }

    const plantsUser = req.user.plants as Plant[];
    const isPlantUser = plantsUser.some(
      (plantUser) => plantUser.id === plant.id,
    );

    if (!isPlantUser) {
      throw new UnauthorizedException('You do not have access to this plant');
    }
    return this.plantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto) {
    return this.plantsService.update(+id, updatePlantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantsService.remove(+id);
  }

  @Get(':id/linkedGeneralPlant')
  findLinkedGeneralPlant(@Param('id') id: string) {
    return this.plantsService.findLinkedGeneralPlants(+id);
  }
}
