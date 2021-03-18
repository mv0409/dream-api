import express from 'express';
import { env } from './env'
import Routes from './routes';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

class App {
    public app!: express.Application;
	public port!: string;
    constructor(
        private routes: Routes
    ) {
        this.initDb()
        this.app = express()
        this.port = env.app.port || '3000'
        this.initMiddlewares()
        this.initRoutes()
    }

    private initRoutes(): void {
		this.app.use(this.routes.router);
	}

    private initMiddlewares() {
		this.app.use(bodyParser.json({ limit: '50mb' }));
		this.app.use(
			bodyParser.urlencoded({
				extended: true,
				limit: '50mb',
			}),
		);
	}

    private initDb() {
        const options: any = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            poolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 10000, // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
        };

        mongoose.connect(`${env.db.host}/${env.db.name}`, options);
	}

    public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});
	}
}

export default App