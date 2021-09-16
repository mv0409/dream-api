'use strict';

const App = require('./app');
const mongoose = require('mongoose');
const config = require('./config.default');

// MongoDB IIFE
const connectRetry = (() => {
	mongoose
		.connect(config.mongoUri, {
			// MongoDB configuration
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			// Start app
			App.listen(config.port);
		})
		.catch((err) => {
			console.log('💥 Mongoose connection error:', err);
			// Retry connection
			setTimeout(connectRetry, 5000);
		});
})();
