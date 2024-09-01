/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file create-plant.dto.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */
import { CreateAbstractPlantDto } from '../../abstractPlants/dto/create-abstractPlant.dto';
import { User } from '../../../users/entities/user.entity';
import { Sensor } from '../../../sensors/entities/sensor.entity';
import { GeneralPlant } from '../../general-plants/entities/general-plant.entity';

export class CreatePlantDto extends CreateAbstractPlantDto {
  user: User;
  generalPlant: GeneralPlant;
  sensor: Sensor;
  remark: string;
  name: string;
}
