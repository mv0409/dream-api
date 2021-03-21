import express from 'express';
import Database from '../db';
import { env } from '../env';
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

	private initDatabase() {
		this.database.connect();
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});
	}
}

export default App;
