import express from 'express';
import { env } from './env';
import router from './routes';
import db from '../database/models';
import logging from './helpers/logger';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(env.app.port, async () => {
	try {
		await db.sequelize.sync();
		logging.info('SERVER', `APP IS RUNNING ${env.app.port}`);
	} catch (error) {
		logging.info('SERVER', 'CONNECTED TO POSTGRES PORT 5432');
		logging.error(
			'SERVER',
			'CONNECT TO POSTGRES FAILED',
			error.message,
		);
	}
});
