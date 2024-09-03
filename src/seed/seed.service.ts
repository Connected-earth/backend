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
          'Monstera, or Swiss Cheese Plant, originates from Central and South American rainforests. It prefers bright, indirect light and high humidity, mimicking its natural habitat. Well-draining soil is essential, and watering should occur when the top inch is dry. Its iconic large leaves with natural holes require space to grow. Support with a moss pole or trellis encourages vertical growth. Monstera is a fast grower, easy to propagate, and adapts well to indoor environments, making it a popular houseplant.',
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
          ' Native to the tropical Americas, Philodendrons are versatile plants that adapt well to indoor conditions. They thrive in bright, indirect light but can tolerate low light. These plants prefer well-draining soil and should be watered when the top inch is dry. They enjoy moderate humidity and benefit from occasional misting. Philodendrons come in various forms, including climbing and non-climbing types, and their heart-shaped leaves add a touch of green elegance to any room. They’re easy to care for and propagate, making them popular among plant enthusiasts.',
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
          'Native to the tropical Americas, Calathea is celebrated for its vibrant, patterned foliage. It thrives in high humidity and indirect light, making it perfect for indoor environments like bathrooms. Keep its soil consistently moist but not waterlogged, and use distilled water to avoid leaf spots from minerals. Calatheas prefer warm temperatures and do not tolerate drafts or sudden temperature changes. Regular misting and a humidity tray can help maintain the humidity it needs, and occasional pruning keeps the plant healthy.',
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
          'Aloe Vera originates from the Arabian Peninsula but is found in various warm climates worldwide. This succulent plant prefers bright, indirect sunlight and well-draining soil, making it ideal for indoor or outdoor settings with minimal watering. Allow the soil to dry out between waterings. Aloe Vera is well-known for its medicinal gel, which is used to treat burns and skin irritations. The plant is easy to care for, thriving in warm temperatures and tolerating some neglect, making it a popular choice for home gardens.',
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
          "Originating from Southeast Asia, Pothos is a hardy, low-maintenance plant ideal for beginners. It can thrive in various light conditions, from low to bright indirect light, and prefers well-draining soil. Water when the top inch of soil dries out, and Pothos will tolerate some neglect. It's known for its trailing vines and heart-shaped leaves, making it a popular choice for hanging baskets. Pothos is also valued for its air-purifying qualities, removing toxins like formaldehyde from the air, contributing to a healthier indoor environment.",
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
