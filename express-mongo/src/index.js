'use strict';

const express = require('express');
const MainRouter = require('./main.router');
const config = require('./config.default');
const { dbClient } = require('./db');

const app = express();

const db = dbClient(config);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

app.use('/', MainRouter);

const server = app.listen(config.port, () => {
  /* eslint-disable-next-line no-console */
  console.log('🚀 Dream server started: ', config.publicDomain);
});

module.exports = { server, db };
