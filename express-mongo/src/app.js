'use strict';

const express = require('express');
const MainRouter = require('./main.router');
const config = require('./config.default');

class App {
	_router = MainRouter;
	constructor() {
		this._app = express();

		// Initialize middlewares in order
		this._app.use(express.json({ limit: '50mb' }));
		this._app.use(express.urlencoded({ extended: false }));

		// Public routes
		this._app.use('/public', (_, res) => {
			res.send({ success: true });
		});

		// Private routes
		this._app.use('/', this._router);

		// Not found error middleware
		this._app.use((_, res) => {
			res.status(404).json({ error: 'endpoint not found' });
		});
	}

	// Start the server on the correct port
	listen(port) {
		this._app.listen(port, () => {
			console.log(`🚀 Dream server started:`, config.publicDomain);
		});
	}
}

module.exports = new App();
