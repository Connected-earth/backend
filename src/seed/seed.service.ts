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
      user.email = faker.internet.email();
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
    const plants = [
      {
        type: 'Monstera',
        humidityMin: 4,
        humidityMax: 6,
        ambientHumidityMin: 60,
        ambientHumidityMax: 80,
        lightMin: 500,
        lightMax: 1500,
        temperatureMin: 18.0,
        temperatureMax: 27.0,
        soilMoistureMin: 4,
        soilMoistureMax: 6,
        image: 'monstera.png',
        description:
          'Monstera, native to the tropical rainforests of Central and South America, is known for its large, glossy leaves with unique natural holes. It is a popular indoor plant due to its ability to thrive in a variety of indoor conditions.',
      },
      {
        type: 'Philodendron',
        humidityMin: 4,
        humidityMax: 6,
        ambientHumidityMin: 60,
        ambientHumidityMax: 80,
        lightMin: 250,
        lightMax: 700,
        temperatureMin: 15.0,
        temperatureMax: 24.0,
        soilMoistureMin: 4,
        soilMoistureMax: 6,
        image: 'philodendron.jpg',
        description:
          'Philodendron plants are native to the tropical regions of the Americas. They are prized for their beautiful, heart-shaped leaves and are easy to grow, making them a favorite choice for indoor gardening enthusiasts.',
      },
      {
        type: 'Calathea',
        humidityMin: 5,
        humidityMax: 7,
        ambientHumidityMin: 55,
        ambientHumidityMax: 70,
        lightMin: 500,
        lightMax: 800,
        temperatureMin: 13.0,
        temperatureMax: 21.0,
        soilMoistureMin: 5,
        soilMoistureMax: 7,
        image: 'calathea.png',
        description:
          'Calathea, originating from the tropical Americas, is known for its vibrant, patterned foliage. These plants prefer high humidity and indirect light, making them well-suited for indoor environments.',
      },
      {
        type: 'Aloe Vera',
        humidityMin: 1,
        humidityMax: 3,
        ambientHumidityMin: 40,
        ambientHumidityMax: 50,
        lightMin: 700,
        lightMax: 1500,
        temperatureMin: 13.0,
        temperatureMax: 27.0,
        soilMoistureMin: 1,
        soilMoistureMax: 3,
        image: 'aloe_vera.jpg',
        description:
          'Aloe Vera, native to the Arabian Peninsula, is a succulent plant species that is widely cultivated for its medicinal properties. It prefers dry, warm environments and is a common houseplant due to its low maintenance needs.',
      },
      {
        type: 'Pothos',
        humidityMin: 4,
        humidityMax: 6,
        ambientHumidityMin: 50,
        ambientHumidityMax: 70,
        lightMin: 250,
        lightMax: 700,
        temperatureMin: 15.0,
        temperatureMax: 29.0,
        soilMoistureMin: 4,
        soilMoistureMax: 6,
        image: 'pothos.png',
        description:
          "Pothos, also known as Devil's Ivy, is a tropical vine native to the Solomon Islands. It is extremely resilient and can thrive in a variety of conditions, making it a popular choice for both beginner and experienced plant enthusiasts.",
      },
    ];

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
