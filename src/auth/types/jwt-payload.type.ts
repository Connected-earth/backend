/**
 * Project Name: PlantKeeper
 *
 * @created 30.08.24
 * @file jwt-payload.type.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

export type JwtPayloadType = {
  sub: string;
  username: string;
  email: string;
  role: string;
};
