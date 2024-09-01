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
      .addSelect('sensor.name', 'sensorName')
      .addSelect('sensor.remark', 'sensorRemark')
      .addSelect('sensor.humidity', 'sensorHumidity')
      .addSelect('sensor.light', 'sensorLight')
      .addSelect('sensor.temperature', 'sensorTemperature')
      .addSelect('plant.id', 'plantId')
      .addSelect('plant.name', 'plantName')
      .from(Sensor, 'sensor')
      .leftJoin(Plant, 'plant', 'plant.sensorId = sensor.id'),
})
export class SensorsLinkedPlantView {
  @ViewColumn()
  sensorId: number;

  @ViewColumn()
  sensorRemark: string;

  @ViewColumn()
  sensorHumidity: number;

  @ViewColumn()
  sensorLight: number;

  @ViewColumn()
  sensorTemperature: number;

  @ViewColumn()
  plantId: number;

  @ViewColumn()
  plantName: string;
}
