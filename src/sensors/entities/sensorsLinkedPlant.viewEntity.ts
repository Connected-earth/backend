/**
 * Project Name: PlantKeeper
 *
 * @created 01.09.24
 * @file sensorsLinkedPlant.viewEntity.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { ViewColumn, ViewEntity } from 'typeorm';
import { Sensor } from './sensor.entity';
import { Plant } from '../../plants/userPlants/entities/plant.entity';

@ViewEntity({
  schema: 'plantkeeper_test',
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .select('sensor.id', 'sensorId')
      .addSelect('plant.id', 'plantId')
      .from(Sensor, 'sensor')
      .innerJoin(Plant, 'plant', 'plant.sensorId = sensor.id'),
})
export class SensorsLinkedPlantView {
  @ViewColumn()
  sensorId: number;

  @ViewColumn()
  plantId: number;
}
