'use strict';

const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
	// Server port
	port: Number(process.env.PORT) || 3000,
	// Configuration for MongoDB
	mongoUri: process.env.ENVIRONMENT === 'test'? process.env.MONGO_URI_TEST : process.env.MONGO_URI,
	// Public domain of Dream
	publicDomain: process.env.PUBLIC_DOMAIN || 'localhost:3000',
	// App name
	appNAme: process.env.APP_NAME || 'dream',
	// environment
	environment:  process.env.ENVIRONMENT === 'test'? 'test' : 'dev'
};
