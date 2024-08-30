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

export class CreatePlantDto extends CreateAbstractPlantDto {
  userId?: number;
  sensorId: number;
  remark: string;
}
