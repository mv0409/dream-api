import { Router } from 'express';
import DreamRouter from './entities/dream/DreamRouter';

class MainRouter {
	private _router = Router();
	private _subrouterDream: Router;

	constructor() {
		this._subrouterDream = new DreamRouter().router;
		this._configure();
	}

	get router() {
		return this._router;
	}

	_configure() {
		this._router.use('/dream', this._subrouterDream);
	}
}

export default MainRouter;
