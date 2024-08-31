/**
 * Project Name: PlantKeeper
 *
 * @created 31.08.24
 * @file sensor.factory.ts
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
import { Sensor } from '../../../sensors/entities/sensor.entity';
import { User } from '../../../users/entities/user.entity';
import { Faker } from '@faker-js/faker';

export default setSeederFactory(Sensor, (faker: Faker, users: User[]) => {
  const sensor = new Sensor();
  const index = Math.floor(Math.random() * users.length);
  sensor.user = users.at(index) as User;
  sensor.name = faker.person.firstName();
  sensor.remark = faker.lorem.sentence(7);
  sensor.humidity = faker.number.float({ fractionDigits: 2 });
  sensor.light = faker.number.float({ fractionDigits: 2 });
  sensor.temperature = faker.number.float({ fractionDigits: 2 });

  return sensor;
});
