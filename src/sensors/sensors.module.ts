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
import { UserPlantsLinkedGeneralPlantsViewEntity } from '../plants/userPlants/entities/userPlantsLinkedGeneralPlants.viewEntity';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sensor,
      SensorsLinkedPlantView,
      UserPlantsLinkedGeneralPlantsViewEntity,
      User,
    ]),
  ],
  controllers: [SensorsController],
  providers: [SensorsService, MailService, UsersService],
})
export class SensorsModule {}
