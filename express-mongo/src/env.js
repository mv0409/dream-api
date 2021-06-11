const dotenv = require('dotenv');

dotenv.config();

const env = {
	app: {
		port: Number(process.env.APP_PORT) || 3000,
	},
	db: {
		url: process.env.DB_URL || 'mongodb://localhost:27017',
		name: process.env.DB_NAME || 'js-mongo',
	},
};

module.exports = env;
