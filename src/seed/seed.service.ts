import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Sensor } from '../sensors/entities/sensor.entity';
import { GeneralPlant } from '../plants/general-plants/entities/general-plant.entity';
import { Plant } from '../plants/userPlants/entities/plant.entity';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

enum possibleRoles {
  Guess,
  Admin,
}

const passwordUsers = 'changeme';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Sensor)
    private sensorsRepository: Repository<Sensor>,
    @InjectRepository(GeneralPlant)
    private generalPlantsRepository: Repository<GeneralPlant>,
    @InjectRepository(Plant)
    private plantsRepository: Repository<Plant>,
  ) {}

  async seedDb() {
    await this.seedUser();
    await this.seedSensors();
    await this.seedGeneralPlants();
    await this.seedPlants();
  }

  async seedUser() {
    const users = [];
    const numUsers = 10;
    for (let i = 0; i < numUsers; i++) {
      const user = new User();
      user.username = faker.internet.userName();
      user.email = faker.internet.email().toLowerCase();
      user.password = await argon.hash(passwordUsers);
      user.role = possibleRoles[Math.round(Math.random())];
      users.push(user);
    }

    await this.usersRepository.save(users);
  }

  async seedSensors() {
    const users = await this.usersRepository.find({
      relations: {
        sensors: true,
        plants: true,
      },
    });
    const sensors = [];
    const numSensors = 3;
    for (const user of users) {
      for (let i = 0; i < numSensors; i++) {
        const sensor = new Sensor();
        sensor.user = user;
        sensor.name = faker.internet.userName({ firstName: 'sensor' });
        sensor.remark = faker.lorem.sentence();
        sensor.humidity = faker.number.int({ min: 0, max: 100 });
        sensor.light = faker.number.int({ min: 160, max: 800 });
        sensor.temperature = faker.number.float({
          min: -10,
          max: 40,
          fractionDigits: 2,
        });
        sensors.push(sensor);
      }
    }
    await this.sensorsRepository.save(sensors);
  }

  async seedGeneralPlants() {
    const plants = [];
    const numPlants = 5;
    for (let i = 0; i < numPlants; i++) {
      const plant = new GeneralPlant();
      plant.image = faker.image.urlPlaceholder();
      plant.type = faker.lorem.words(2);
      plant.humidityMin = faker.number.int({ min: 0, max: 50 });
      plant.humidityMax = faker.number.int({ min: 51, max: 100 });
      plant.ambientHumidityMin = faker.number.int({ min: 0, max: 50 });
      plant.ambientHumidityMax = faker.number.int({ min: 51, max: 100 });
      plant.lightMin = faker.number.int({ min: 160, max: 400 });
      plant.lightMax = faker.number.int({ min: 400, max: 800 });
      plant.temperatureMin = faker.number.float({
        min: -10,
        max: 15,
        fractionDigits: 2,
      });
      plant.temperatureMax = faker.number.float({
        min: 16,
        max: 40,
        fractionDigits: 2,
      });
      plant.description = faker.lorem.paragraphs({ min: 3, max: 7 });
      plants.push(plant);
    }

    await this.generalPlantsRepository.save(plants);
  }

  async seedPlants() {
    const users = await this.usersRepository.find({
      relations: {
        sensors: true,
        plants: true,
      },
    });
    const generalPlants = await this.generalPlantsRepository.find();
    const plants = [];
    const numPlants = 3;

    for (const user of users) {
      for (let i = 0; i < numPlants; i++) {
        const plant = new Plant();
        plant.image = faker.image.urlPlaceholder();
        plant.name = faker.person.firstName();
        plant.user = user;
        const index = Math.floor(Math.random() * generalPlants.length);
        plant.generalPlant = generalPlants.at(index) as GeneralPlant;
        plant.sensor = user.sensors.at(i) as Sensor;
        plant.remark = faker.lorem.sentence();
        plants.push(plant);
      }
    }
    await this.plantsRepository.save(plants);
  }
}
