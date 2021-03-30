import express from 'express';
import { env } from './env';

const app = express();

app.listen(env.app.port, () => {
	console.log(`App running on ${env.app.port}`);
});
