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
import { Repository } from 'typeorm';
import { SensorsLinkedPlantView } from './entities/sensorsLinkedPlant.viewEntity';
import { UserPlantsLinkedGeneralPlantsViewEntity } from '../plants/userPlants/entities/userPlantsLinkedGeneralPlants.viewEntity';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private sensorsRepository: Repository<Sensor>,
    @InjectRepository(SensorsLinkedPlantView)
    private sensorsLinkedPlantView: Repository<SensorsLinkedPlantView>,
    @InjectRepository(UserPlantsLinkedGeneralPlantsViewEntity)
    private userPlantsLinkedGeneralPlants: Repository<UserPlantsLinkedGeneralPlantsViewEntity>,
    private readonly mailService: MailService,
    private readonly userService: UsersService,
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
    const delayBetweenAlerts = 12 * 60 * 60 * 1000;
    const sensor = (await this.findOne(id)) as Sensor;
    const checkBoundary = (
      minValue: number | undefined,
      maxValue: number | undefined,
      valueToCkeck: number,
    ): boolean => {
      if (minValue !== undefined && maxValue !== undefined) {
        return valueToCkeck <= maxValue && valueToCkeck >= minValue;
      }
      return true;
    };
    if (!sensor) {
      throw new UnauthorizedException(
        'Sensor does not exist. You need to create it before updating it',
      );
    }
    if (
      sensor.lastAlert === null ||
      Date.now() - sensor.lastAlert.getTime() > delayBetweenAlerts
    ) {
      updateSensorDto.lastAlert = new Date(Date.now());
      const plantId = await this.sensorsLinkedPlantView.findOneBy({
        sensorId: id,
      });
      if (plantId) {
        const generalPlantValue =
          await this.userPlantsLinkedGeneralPlants.findOneBy({
            plantId: plantId.plantId,
          });
        if (
          !checkBoundary(
            generalPlantValue?.generalPlantHumidityMin,
            generalPlantValue?.generalPlantHumidityMax,
            sensor.humidity,
          ) ||
          !checkBoundary(
            generalPlantValue?.generalPlantLightMin,
            generalPlantValue?.generalPlantLightMax,
            sensor.light,
          ) ||
          !checkBoundary(
            generalPlantValue?.generalPlantTemperatureMin,
            generalPlantValue?.generalPlantTemperatureMax,
            sensor.temperature,
          )
        ) {
          const user = await this.userService.findOne(sensor.userId);
          if (user) {
            await this.mailService.sendAlertMail(
              user,
              generalPlantValue?.plantName !== undefined
                ? generalPlantValue?.plantName
                : 'One of your plants',
            );
          }
        }
      }
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
