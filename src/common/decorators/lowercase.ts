import { Transform } from 'class-transformer';

export function Lowercase() {
  return Transform(({ value }) => value.toLowerCase());
}
