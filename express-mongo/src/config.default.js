'use strict';

const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.ENVIRONMENT === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI,
  publicDomain: process.env.PUBLIC_DOMAIN || 'localhost:3000',
  appNAme: process.env.APP_NAME || 'dream',
  environment: process.env.ENVIRONMENT === 'test' ? 'test' : 'dev'
};
