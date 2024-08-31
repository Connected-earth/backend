/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file create-user.dto.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */
import { Sensor } from '../../sensors/entities/sensor.entity';
import { Plant } from '../../plants/userPlants/entities/plant.entity';

export class CreateUserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  sensors: Sensor[];
  plants: Plant[];
}
