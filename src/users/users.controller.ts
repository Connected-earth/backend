/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file users.controller.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from './entities/user.entity';
import { CreatePlantDto } from '../plants/userPlants/dto/create-plant.dto';
import { PlantsService } from '../plants/userPlants/plants.service';
import { CreateSensorDto } from '../sensors/dto/create-sensor.dto';
import { SensorsService } from '../sensors/sensors.service';
import { SensorsLinkedPlantView } from '../sensors/entities/sensorsLinkedPlant.viewEntity';

import { TokenAuthGuard } from '../auth/token/token-auth.guard';
import { JwtOrTokenAuthGuard } from '../auth/jwt-or-token/jwt-or-token-auth.guard';

import { AuthGuard } from '@nestjs/passport';
import {
  UserPlantsLinkedGeneralPlantsViewEntity
} from '../plants/userPlants/entities/userPlantsLinkedGeneralPlants.viewEntity';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly plantsService: PlantsService,
    private readonly sensorsService: SensorsService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtOrTokenAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findUserWithJwt(@Request() req: any) {
    return this.findOne(req.user.id);
  }

  @Get('sensors')
  @UseGuards(JwtAuthGuard)
  async findUserRealtedSensors(@Request() req: any) {
    const user = (await this.findOne(req.user.id)) as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.sensors;
  }

  @Get('sensors/linkedPlant')
  @UseGuards(JwtAuthGuard)
  async findUserRelatedSensorsPlant(@Request() req: any) {
    const user = (await this.findOne(req.user.id)) as User;

    if (!user) {
      throw new UnauthorizedException('This user is not found');
    }

    const sensorsLinked = [];
    for (const sensor of user.sensors) {
      const sensorPlant = (await this.sensorsService.findLinkedPlants(
        sensor.id,
      )) as SensorsLinkedPlantView;
      if (sensorPlant === null) {
        continue;
      }
      sensorsLinked.push(sensorPlant);
    }
    return sensorsLinked;
  }

  @Get('plants/linkedGeneralPlant')
  @UseGuards(JwtAuthGuard)
  async findUserRelatedGeneralPlants(@Request() req: any) {
    const user = (await this.findOne(req.user.id)) as User;

    if (!user) {
      throw new UnauthorizedException('This user is not found');
    }

    const generalPlantsLinked = [];
    for (const plant of user.plants) {
      const generalPlantPlant = (await this.plantsService.findLinkedGeneralPlants(
          plant.id,
      )) as UserPlantsLinkedGeneralPlantsViewEntity;
      if (generalPlantPlant === null) {
        continue;
      }
      generalPlantsLinked.push(generalPlantPlant);
    }
    return generalPlantsLinked;
  }

  @Get('plants')
  @UseGuards(JwtAuthGuard)
  async findUserRealtedPlants(@Request() req: any) {
    const user = (await this.findOne(req.user.id)) as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.plants;
  }

  @Post('plants')
  @UseGuards(JwtAuthGuard)
  async addPlantToUser(
    @Request() req: any,
    @Body() createPlantDto: CreatePlantDto,
  ) {
    createPlantDto.user = req.user;
    await this.plantsService.create(createPlantDto);
  }

  @Post('sensors')
  @UseGuards(JwtAuthGuard)
  async addSensorToUser(
    @Request() req: any,
    @Body() createSensorDto: CreateSensorDto,
  ) {
    createSensorDto.user = req.user;
    await this.sensorsService.create(createSensorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':email')
  findOneByMail(@Param('email') email: string) {
    return this.usersService.findOneByMail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateMe(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id;
    return this.usersService.update(+userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
