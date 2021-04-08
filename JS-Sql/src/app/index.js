import express from 'express';
import env from '../env';
import routes from '../routes';
import db from '../database/models';
import logging from '../helpers/logger';

class App {
	constructor() {
		this.app = express();
		this.routes = routes;
		this.initMiddlewares();
		this.initDatabase();
		this.initRoutes();
	}

	initMiddlewares() {
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(express.urlencoded({ extended: true }));
	}

	initRoutes() {
		this.app.use(this.routes);
	}

	async initDatabase() {
		try {
			await db.sequelize.sync();
			logging.info(
				'SERVER',
				`CONNECTED TO POSTGRES PORT ${env.db.port}`,
			);
		} catch (error) {
			logging.error(
				'SERVER',
				'CONNECT FAILED',
				error.message,
			);
		}
	}

	listen() {
		this.app.listen(env.app.port, () => {
			logging.info(
				'SERVER',
				`APP IS RUNNING ${env.app.port}`,
			);
		});
	}
}

export default App;
