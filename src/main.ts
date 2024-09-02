/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file main.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: 'https://plantkeeper.ch', // allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // if you need to include cookies or authorization headers
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(4000);
}
bootstrap();
