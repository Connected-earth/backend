/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file general-plant.entity.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { AbstractPlant } from '../../abstractPlants/entity/abstractPlant.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Plant } from '../../userPlants/entities/plant.entity';

@Entity({ schema: 'plantkeeper_test' })
export class GeneralPlant extends AbstractPlant {
  @Column()
  type: string;

  @Column()
  humidityMin: number;

  @Column()
  humidityMax: number;

  @Column()
  ambientHumidityMin: number;

  @Column()
  ambientHumidityMax: number;

  @Column()
  lightMin: number;

  @Column()
  lightMax: number;

  @Column('float8')
  temperatureMin: number;

  @Column('float8')
  temperatureMax: number;

  @Column()
  description: string;

  @OneToMany(() => Plant, (plant) => plant.generalPlant, {
    eager: true,
  })
  plants: Plant[];
}
