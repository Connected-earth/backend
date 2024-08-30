/**
 * Project Name: PlantKeeper
 *
 * @created 28.08.24
 * @file jwt.strategy.ts
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
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { User } from '../../users/entities/user.entity';
import { JwtPayloadType } from '../types/jwt-payload.type';
import { AuthService } from '../auth.service';

type DoneCallback = (err: Error | null, user?: User | false) => void;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromAuthHeaderAsBearerToken(),
          (request: Request): string => request.cookies.jwt,
        ]),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret,
      },
      async (payload: JwtPayloadType, done: DoneCallback) => {
        try {
          const user = await this.authService.validateJwtPayload(payload);

          done(null, user);
        } catch (error) {
          done(error, false);
        }
      },
    );
  }
  /*
  async validate(payload: any) {
    Logger.log(payload);
    return { userId: payload.userId, email: payload.email };
  }
  */
}
