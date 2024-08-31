/**
 * Project Name: PlantKeeper
 *
 * @created 28.08.24
 * @file local.strategy.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../users/entities/user.entity';

type DoneCallback = (err: Error | null, user?: User | false) => void;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done: DoneCallback) => {
        try {
          const user = await this.authService.validateUser(email, password);

          done(null, user);
        } catch (error) {
          done(error, false);
        }
      },
    );
  }
  /*
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  */
}
