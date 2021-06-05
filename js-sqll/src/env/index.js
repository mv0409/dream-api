import dotenv from 'dotenv';

dotenv.config();

const env = {
	app: {
		name: process.env.APP_NAME,
		port: process.env.APP_PORT,
		schema: process.env.APP_SCHEMA,
		host: process.env.APP_HOST,
		routePrefix: process.env.APP_ROUTE_PREFIX,
	},
	db: {
		name: process.env.DB_NAME,
		port: process.env.DB_PORT,
	},
};
export default env;
