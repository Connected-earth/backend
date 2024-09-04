/**
 * Project Name: PlantKeeper
 *
 * @created 04.09.24
 * @file jwt-or-token-auth.guard.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOrTokenAuthGuard extends AuthGuard(['jwt', 'token']) {}
