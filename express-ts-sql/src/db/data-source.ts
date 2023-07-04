import { AppDataSource } from './ormconfig';

export const dbClient = async () => {
  try {
    await AppDataSource.initialize();
    /* eslint-disable-next-line no-console */
    console.log('✔️  Database connected');
    return AppDataSource;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log('❌  Database connect error :', error);
  }
};
