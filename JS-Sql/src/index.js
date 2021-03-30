import express from 'express';
import { env } from './env';
import router from './routes';
import db from '../database/models';

db.sequelize.sync();
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(env.app.port, () => {
	console.log(`App running on ${env.app.port}`);
});
