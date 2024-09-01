/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file user.entity.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sensor } from '../../sensors/entities/sensor.entity';
import { Plant } from '../../plants/userPlants/entities/plant.entity';

@Entity({ schema: 'plantkeeper_test' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Sensor, (sensor) => sensor.user, {
    eager: true,
  })
  sensors: Sensor[];

  @OneToMany(() => Plant, (plant) => plant.user, {
    eager: true,
  })
  plants: Plant[];
}
