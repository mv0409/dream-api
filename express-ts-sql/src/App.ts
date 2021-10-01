import express, { Response } from 'express';
import MainRouter from './main.router';

class App {
	public _app = express();
	private _mainRouter = new MainRouter().router;

	constructor() {
		// init middlewares in order
		this._app.use(express.json({ limit: '50mb' }));
		this._app.use(express.urlencoded({ extended: true }));

		// public routes
		this._app.use('/public', (res: Response) => {
			res.status(200).send({ success: true });
		});

		// private routes
		this._app.use('/', this._mainRouter);

		// endpoint not found error handle
		this._app.use((res: Response) => {
			res.status(404).send({ error: 'endpoint not found' });
		});
	}
}

export default App;
