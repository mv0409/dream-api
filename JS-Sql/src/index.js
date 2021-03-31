import express from 'express';
import { env } from './env';
import router from './routes';
import db from '../database/models';
import logging from './helpers/logger';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(router);

db.sequelize.sync().then(() => {
	try {
		app.listen(env.app.port, () => {
			logging.info(
				'SERVER',
				`APP IS RUNNING ${env.app.port}`,
			);
		});
		logging.info('SERVER', 'CONNECTED TO POSTGRES PORT 5432');
	} catch (error) {
		logging.error(
			'SERVER',
			'CONNECT TO POSTGRES FAILED',
			error.message,
		);
	}
});
