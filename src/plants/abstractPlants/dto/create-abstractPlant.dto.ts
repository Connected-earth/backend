/**
 * Project Name: PlantKeeper
 *
 * @created 30.08.24
 * @file create-abstractPlant.dto.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

export abstract class CreateAbstractPlantDto {
  id: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
