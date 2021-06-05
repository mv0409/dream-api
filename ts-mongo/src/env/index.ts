import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.join(
		process.cwd(),
		`.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
	),
});

export const env = {
	app: {
		name: process.env.APP_NAME,
		port: process.env.APP_PORT,
		schema: process.env.APP_SCHEMA,
		host: process.env.APP_HOST,
		routePrefix: process.env.APP_ROUTE_PREFIX,
	},
	db: {
		name: process.env.DB_NAME,
		host: process.env.DB_URL,
	},
};
