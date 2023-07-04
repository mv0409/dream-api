/* dream entity schema */
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from 'typeorm';
import { DREAM_TYPE } from './types';

@Entity()
export class Dream extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  title: string;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: DREAM_TYPE })
  type: DREAM_TYPE;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
