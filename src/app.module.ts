/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file app.module.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/userPlants/plants.module';
import { SensorsModule } from './sensors/sensors.module';
import { GeneralPlantsModule } from './plants/general-plants/general-plants.module';
import { SeedModule } from './seed/seed.module';
import { SensorsLinkedPlantView } from './sensors/entities/sensorsLinkedPlant.viewEntity';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseExceptionFilterException } from './db/databaseExceptionFilter.exception';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserPlantsLinkedGeneralPlantsViewEntity } from './plants/userPlants/entities/userPlantsLinkedGeneralPlants.viewEntity';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        SensorsLinkedPlantView,
        UserPlantsLinkedGeneralPlantsViewEntity,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        ignoreTLS: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: process.env.MAIL_USER,
      },
      template: {
        dir: path.join(process.cwd(), './src/mail/templates/'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    UsersModule,
    PlantsModule,
    SensorsModule,
    GeneralPlantsModule,
    SeedModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilterException,
    },
  ],
})
export class AppModule {}
