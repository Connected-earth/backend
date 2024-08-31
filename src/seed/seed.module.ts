import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersService } from '../users/users.service';
import { PlantsService } from '../plants/userPlants/plants.service';
import { SensorsService } from '../sensors/sensors.service';
import { GeneralPlantsService } from '../plants/general-plants/general-plants.service';

@Module({
  controllers: [SeedController],
  providers: [
    SeedService,
    UsersService,
    PlantsService,
    SensorsService,
    GeneralPlantsService,
  ],
})
export class SeedModule {}
