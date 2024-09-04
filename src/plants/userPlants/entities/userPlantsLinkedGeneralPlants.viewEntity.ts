import { ViewColumn, ViewEntity } from 'typeorm';
import { Plant } from './plant.entity';
import { GeneralPlant } from '../../general-plants/entities/general-plant.entity';
import { Sensor } from '../../../sensors/entities/sensor.entity';

@ViewEntity({
  schema: 'plantkeeper_test',
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .select('plant.id', 'plantId')
      .addSelect('plant.name', 'plantName')
      .addSelect('plant.remark', 'plantRemark')
      .addSelect('plant.image', 'plantImage')
      .addSelect('plant.sensorId', 'plantSensorId')
      .addSelect('sensor.humidity', 'sensorHumidity')
      .addSelect('sensor.light', 'sensorLight')
      .addSelect('sensor.temperature', 'sensorTemperature')
      .addSelect('sensor.name', 'sensorName')
      .addSelect('generalPlant.id', 'generalPlantId')
      .addSelect('generalPlant.image', 'generalPlantImage')
      .addSelect('generalPlant.type', 'generalPlantType')
      .addSelect('generalPlant.humidityMin', 'generalPlantHumidityMin')
      .addSelect('generalPlant.humidityMax', 'generalPlantHumidityMax')
      .addSelect('generalPlant.ambientHumidityMin', 'generalPlantAmbientHumidityMin')
      .addSelect('generalPlant.ambientHumidityMax', 'generalPlantAmbientHumidityMax')
      .addSelect('generalPlant.lightMin', 'generalPlantLightMin')
      .addSelect('generalPlant.lightMax', 'generalPlantLightMax')
      .addSelect('generalPlant.temperatureMin', 'generalPlantTemperatureMin')
      .addSelect('generalPlant.temperatureMax', 'generalPlantTemperatureMax')
      .addSelect('generalPlant.description', 'generalPlantDescription')
      .from(Plant, 'plant')
      .leftJoin(GeneralPlant, 'generalPlant', 'generalPlant.id = plant.generalPlantId')
      .leftJoin(Sensor, 'sensor', 'sensor.id = plant.sensorId'),
})
export class UserPlantsLinkedGeneralPlantsViewEntity {
  @ViewColumn()
  plantId: number;

  @ViewColumn()
  plantName: string;

  @ViewColumn()
  plantRemark: string;

  @ViewColumn()
  plantImage: string;

  @ViewColumn()
  plantSensorId: number;

  @ViewColumn()
  sensorHumidity: number;

  @ViewColumn()
  sensorLight: number;

  @ViewColumn()
  sensorTemperature: number;

  @ViewColumn()
  sensorName: string;

  @ViewColumn()
  generalPlantId: number;

  @ViewColumn()
  generalPlantImage: string;

  @ViewColumn()
  generalPlantType: string;

  @ViewColumn()
  generalPlantHumidityMin: number;

  @ViewColumn()
  generalPlantHumidityMax: number;

  @ViewColumn()
  generalPlantAmbientHumidityMin: number;

  @ViewColumn()
  generalPlantAmbientHumidityMax: number;

  @ViewColumn()
  generalPlantLightMin: number;

  @ViewColumn()
  generalPlantLightMax: number;

  @ViewColumn()
  generalPlantTemperatureMin: number;

  @ViewColumn()
  generalPlantTemperatureMax: number;

  @ViewColumn()
  generalPlantDescription: string;
}