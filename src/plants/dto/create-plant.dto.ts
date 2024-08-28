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

export class CreatePlantDto {
  id: number;
  type: string;
  name: string;
  remark: string;
  sensorId: number;
  createdAt: Date;
  updatedAt: Date;
}
