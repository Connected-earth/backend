/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file create-general-plant.dto.ts
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

export class CreateGeneralPlantDto extends CreateAbstractPlantDto {
  humidity: number;
  ambientHumidity: number;
  light: number;
  temperatureMin: number;
  temperatureMax: number;
  description: string;
}
