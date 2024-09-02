/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file plant.entity.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Sensor } from '../../../sensors/entities/sensor.entity';
import { AbstractPlant } from '../../abstractPlants/entity/abstractPlant.entity';
import { GeneralPlant } from '../../general-plants/entities/general-plant.entity';

@Entity({ schema: 'plantkeeper_test' })
export class Plant extends AbstractPlant {
  @ManyToOne(() => User, (user) => user.sensors, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ name: 'generalPlantId' })
  generalPlantId: number;

  @ManyToOne(() => GeneralPlant, (generalPlant) => generalPlant.plants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'generalPlantId' })
  generalPlant: GeneralPlant;

  @OneToOne(() => Sensor, (sensor) => sensor.plant, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  sensor: Sensor;

  @Column()
  remark: string;

  @Column()
  name: string;
}
