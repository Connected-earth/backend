/**
 * Project Name: PlantKeeper
 *
 * @created 03.09.24
 * @file tokens.array.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */
import { Token } from './entities/token.entity';
import * as crypto from 'crypto';
import { Logger } from '@nestjs/common';

// const value1 = crypto.randomBytes(64).toString('base64');
const hash1 =
  '32f375f872261423a14ec671ab8badfd2fad2bfc7ff208627eac6b362355d2a7' as string;

// const value2 = crypto.randomBytes(64).toString('base64');
const hash2 =
  '56e7e87e39bc0f5936ad3266d1b37cbed809fb9b3b68a6bdb23e0ce38336acd2' as string;

Logger.log('Hash for user 1: ' + hash1);
Logger.log('Hash for user 2: ' + hash2);

export const tokens: Token[] = [
  {
    id: 1,
    hash: hash1,
  },
  {
    id: 2,
    hash: hash2,
  },
];
