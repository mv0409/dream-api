import express from 'express';
import { dreamRoutes } from './dream/routes/dream-routes';
import { env } from './env';
import logger from './helpers/logger';
import mongoose from 'mongoose';

class App {
	public app!: express.Application;
	constructor() {
		this.app = express();
		this.initDatabase();
		this.initMiddlewares();
		this.initRoutes();
	}

	private initRoutes(): void {
		this.app.use(dreamRoutes);
	}

	private initMiddlewares(): void {
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(express.urlencoded({ extended: true }));
	}

	private async initDatabase(): Promise<void> {
		try {
			const options: mongoose.ConnectOptions = {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				poolSize: 10, // Maintain up to 10 socket connections
				serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
				socketTimeoutMS: 10000, // Close sockets after 45 seconds of inactivity
				family: 4, // Use IPv4, skip trying IPv6
			};
			await mongoose.connect(
				`${env.db.url}/${env.db.name}`,
				options,
			);
			logger.info('SERVER', 'CONNECTED TO MONGODB');
		} catch (error) {
			logger.error('SERVER', error.message, error);
		}
	}

	public listen(): void {
		this.app.listen(env.app.port, () => {
			logger.info('SERVER', `APP IS RUNNING ${env.app.port}`);
		});
	}
}

export default App;
