import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Sensor } from '../sensors/entities/sensor.entity';
import { GeneralPlant } from '../plants/general-plants/entities/general-plant.entity';
import { Plant } from '../plants/userPlants/entities/plant.entity';
import { faker } from '@faker-js/faker';

enum possibleRoles {
  Guess,
  Admin,
}

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

  seedDb() {
    return 'seeding the db';
  }

  async seedUser() {
    const users = [];
    const numUsers = 10;
    for (let i = 0; i < numUsers; i++) {
      const user = new User();
      user.username = faker.internet.userName();
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      user.role = possibleRoles[Math.round(Math.random())];
      users.push(user);
    }
  }
}
