'use strict';

const express = require('express');
const MainRouter = require('./main.router');

const app = express();

// Initialize middlewares in order
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

// Public routes
app.use('/public', (_, res) => {
	res.send({ success: true });
});

// Private routes
app.use('/', MainRouter);

// Not found error middleware
app.use((_, res) => {
	res.status(404).json({ error: 'endpoint not found' });
})

// export app for e2e testing
module.exports = app
