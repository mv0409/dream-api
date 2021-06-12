import dotenv from 'dotenv';

dotenv.config();

export const env = {
	app: {
		port: Number(process.env.APP_PORT) || 3000,
	},
	db: {
		url: process.env.DB_URL || 'mongodb://localhost:27017',
		name: process.env.DB_NAME || 'js-mongo',
	},
};
