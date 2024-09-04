/**
 * Project Name: PlantKeeper
 *
 * @created 03.09.24
 * @file token.strategy.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'token',
) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        header: 'token',
      },
      false,
    );
  }

  async validate(value: string) {
    const user = await this.authService.validateToken(value);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
