/**
 * Project Name: PlantKeeper
 *
 * @created 31.08.24
 * @file plant.factory.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */
import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Plant } from '../../../plants/userPlants/entities/plant.entity';
import { Sensor } from '../../../sensors/entities/sensor.entity';
import User from './user.factory';
import { GeneralPlant } from '../../../plants/general-plants/entities/general-plant.entity';
/*
export default setSeederFactory(
  Plant,
  (faker: Faker, sensors: Sensor[], generalPlants: GeneralPlant[]) => {
    const plant = new Plant();
    const index = Math.floor(Math.random() * sensors.length);
    // @ts-expect-error the user may be undefined. Though not in our little script
    plant.user = sensors.at(index).user;
    plant.generalPlant = 1;
    return plant;
  },
);
*/
