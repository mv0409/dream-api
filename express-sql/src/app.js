const express = require('express');
const env = require('./env');
const logger = require('./helpers/logger');
const dreamRoutes = require('./dream/routes/dream-routes');
const db = require('./database/models');

class App {
	constructor() {
		this.initDatabase();
		this.app = express();
		this.initMiddlewares();
		this.initRoutes();
	}

	initMiddlewares() {
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(express.urlencoded({ extended: true }));
	}

	initRoutes() {
		this.app.use(dreamRoutes);
	}

	async initDatabase() {
		try {
			await db.sequelize.sync();
			logger.info(
				'SERVER',
				`CONNECTED TO POSTGRES PORT ${env.db.port}`,
			);
		} catch (error) {
			logger.error('SERVER', 'CONNECT FAILED', error.message);
		}
	}

	init() {
		this.app.listen(env.app.port, () => {
			logger.info('SERVER', `APP IS RUNNING ${env.app.port}`);
		});
	}
}

module.exports = App;
