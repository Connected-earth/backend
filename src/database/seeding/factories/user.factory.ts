/**
 * Project Name: PlantKeeper
 *
 * @created 31.08.24
 * @file user.factory.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */
import { User } from '../../../users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';

enum possibleRoles {
  Guess,
  Admin,
}

export default setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.role = possibleRoles[Math.round(Math.random())];

  return user;
});
