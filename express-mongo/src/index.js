'use strict';

const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config.default');

// MongoDB IIFE
const connect = (() => {
	// connect mongoose
	mongoose.connect(config.mongoUri, {
		// MongoDB configuration
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}).then(() => {
		// Start app
		app.listen(config.port, () => {
			console.log('🚀 Dream server started: ', config.publicDomain)
		})
	}).catch((error) => {
		console.log('💥 Mongoose connection error:', error);
	})
})()
