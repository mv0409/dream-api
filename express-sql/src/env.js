const dotenv = require('dotenv');

dotenv.config();

const env = {
	app: {
		port: Number(process.env.APP_PORT) || 3000,
	},
	db: {
		url: Number(process.env.DB_PORT) || 5432,
		name: process.env.DB_NAME || 'js-sql',
	},
};

module.exports = env;
