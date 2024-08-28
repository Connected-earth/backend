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

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sensor } from '../../sensors/entities/sensor.entity';

@Entity({ schema: 'plantkeeper_test' })
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sensors)
  user: User;

  @OneToOne(() => Sensor, (sensor) => sensor.plant, {
    eager: true,
  })
  @JoinColumn()
  sensor: Sensor;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  remark: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
