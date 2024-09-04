import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersService } from '../users/users.service';
import { PlantsService } from '../plants/userPlants/plants.service';
import { SensorsService } from '../sensors/sensors.service';
import { GeneralPlantsService } from '../plants/general-plants/general-plants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralPlant } from '../plants/general-plants/entities/general-plant.entity';
import { Plant } from '../plants/userPlants/entities/plant.entity';
import { Sensor } from '../sensors/entities/sensor.entity';
import { User } from '../users/entities/user.entity';
import { SensorsLinkedPlantView } from '../sensors/entities/sensorsLinkedPlant.viewEntity';
import { UserPlantsLinkedGeneralPlantsViewEntity } from '../plants/userPlants/entities/userPlantsLinkedGeneralPlants.viewEntity';
import { MailService } from "../mail/mail.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Sensor,
      Plant,
      GeneralPlant,
      SensorsLinkedPlantView,
      UserPlantsLinkedGeneralPlantsViewEntity,
    ]),
  ],
  controllers: [SeedController],
  providers: [
    SeedService,
    UsersService,
    PlantsService,
    SensorsService,
    GeneralPlantsService,
    MailService,
  ],
})
export class SeedModule {}
