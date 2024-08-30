import { Module } from '@nestjs/common';
import { GeneralPlantsService } from './general-plants.service';
import { GeneralPlantsController } from './general-plants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralPlant } from './entities/general-plant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralPlant])],
  controllers: [GeneralPlantsController],
  providers: [GeneralPlantsService],
})
export class GeneralPlantsModule {}
