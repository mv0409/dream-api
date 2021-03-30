import express from 'express';
import DreamDto from '../db/dto/dream.dto';
import { env } from '../env';
import { validation } from '../middlewares/dto-validation/dream';
import cb from '../middlewares/express-callback/index';
import Controllers from '../controllers';

class Routes {
	public router = express.Router();
	public routePrefix = env.app.routePrefix as string;

	constructor(private controller: Controllers) {
		this.initRoutes();
	}

	public initRoutes(): void {
		this.router.get(
			`${this.routePrefix}/dream/all-dream-types`,
			cb(this.controller.dreamController.getAllDreamTypes()),
		);
		this.router.post(
			`${this.routePrefix}/dream/create`,
			validation(DreamDto),
			cb(this.controller.dreamController.createDream()),
		);
		this.router.post(
			`${this.routePrefix}/dream/:id/update`,
			validation(DreamDto),
			cb(this.controller.dreamController.updateDream()),
		);
		this.router.delete(
			`${this.routePrefix}/dream/:id/delete`,
			cb(this.controller.dreamController.deleteDream()),
		);
		this.router.get(
			`${this.routePrefix}/dream/read`,
			cb(this.controller.dreamController.readDream()),
		);
		this.router.post(
			`${this.routePrefix}/dream/search`,
			cb(this.controller.dreamController.searchDream()),
		);
	}
}

export default Routes;
