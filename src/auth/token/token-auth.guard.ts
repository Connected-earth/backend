/**
 * Project Name: PlantKeeper
 *
 * @created 03.09.24
 * @file token-auth.guard.ts
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
export class TokenAuthGuard extends AuthGuard('token') {}
