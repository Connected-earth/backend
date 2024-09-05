import { DataSource } from 'typeorm';
import { Sensor } from '../src/sensors/entities/sensor.entity';
import { GeneralPlant } from '../src/plants/general-plants/entities/general-plant.entity';
import { Plant } from '../src/plants/userPlants/entities/plant.entity';
import { User } from '../src/users/entities/user.entity';

export const createTestDataSource = async () => {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:', // Use an in-memory database for testing
    synchronize: true,
    logging: false,
    entities: [User, Plant, GeneralPlant, Sensor], // Add other entities here
  });

  await dataSource.initialize();
  return dataSource;
};
