import express from 'express';
import Database from '../db';
import { env } from '../env';
import logging from '../helpers/log/logging';
import Routes from '../routes';

class App {
	public app!: express.Application;
	public port = env.app.port as string;
	constructor(private routes: Routes, private database: Database) {
		this.app = express();
		this.initDatabase();
		this.initMiddlewares();
		this.initRoutes();
	}

	private initRoutes(): void {
		this.app.use(this.routes.router);
	}

	private initMiddlewares(): void {
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(express.urlencoded({ extended: true }));
	}

	private initDatabase(): void {
		this.database.connect();
	}

	public listen(): void {
		this.app.listen(this.port, () => {
			logging.info('SERVER', `APP IS RUNNING ${this.port}`);
		});
	}
}

export default App;
