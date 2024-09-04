/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file app.controller.spec.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailService } from './mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { SensorsService } from './sensors/sensors.service';

describe('AppController', () => {
  let appController: AppController;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test' })],
      controllers: [AppController],
      providers: [
        AppService,
        JwtService,
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        MailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    usersRepository = app.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
