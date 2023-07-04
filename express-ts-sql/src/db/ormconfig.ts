import { DataSource } from 'typeorm';
import { DATABASE } from '../config/env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/**.ts'],
  subscribers: [],
  ...DATABASE
});
