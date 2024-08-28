/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file auth.controller.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  validateUser(@Body() signInDto: Record<string, any>) {
    return this.authService.validateUser(
      signInDto.username,
      signInDto.password,
    );
  }
}
