import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import { Dream } from './entities/dream/DreamEntity';

dotenv.config({ path: '.env' });

export default {
	port: Number(process.env.PORT) || 3000,
	publicDomain: process.env.PUBLICDOMAIN || 'localhost:3000',
	environment: process.env.ENVIRONMENT,
	typeorm: {
		host: 'localhost',
		type: 'postgres',
		port: Number(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		entities: [
			Dream,
			// 'src/**/**.entity{.ts,.js}',
		],
		migrations: [
			// 'src/database/migrations/*.ts',
		],
		cli: {
			// migrationsDir: 'src/database/migrations',
		},
		synchronize: process.env.ENVIRONMENT === 'production' ? false : true,
	} as ConnectionOptions,
};
