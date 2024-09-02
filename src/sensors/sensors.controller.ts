/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file sensors.controller.ts
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
  Put,
  Res,
} from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Sensor } from './entities/sensor.entity';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpAdapterHost } from '@nestjs/core';

@Controller('sensors')
export class SensorsController {
  constructor(
    private readonly sensorsService: SensorsService,
    private readonly httpAdapterHost: HttpAdapterHost<ExpressAdapter>,
  ) {}

  @Post()
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req: any) {
    const sensor = (await this.sensorsService.findOne(+id)) as Sensor;

    if (!sensor) {
      throw new UnauthorizedException('Sensor not found');
    }

    const sensorsUser = req.user.sensors as Sensor[];
    const isSensorUser = sensorsUser.some(
      (sensorUser) => sensorUser.id === sensor.id,
    );

    if (!isSensorUser) {
      throw new UnauthorizedException('You do not have access to this sensor');
    }

    return this.sensorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(+id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(+id);
  }

  @Get(':id/linkedPlants')
  findLinkedPlants(@Param('id') id: string) {
    return this.sensorsService.findLinkedPlants(+id);
  }
}
