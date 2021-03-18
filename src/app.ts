import express from 'express';
import { env } from './env'

class App {
    public app!: express.Application;
	public port!: string;
    constructor() {
        this.app = express()
        this.port = env.app.port
    }

    public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});
	}
}

export default App