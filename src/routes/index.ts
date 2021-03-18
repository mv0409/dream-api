import express from 'express';
import DreamController from '../controllers/dream';
import DreamDto from '../db/dto/dream.dto';
import { env } from '../env'
import { validation } from '../middlewares/validation-middleware';
import cb from '../middlewares/express-callback/index'


class Routes {
	public router = express.Router();
	public routePrefix = env.app.routePrefix;

	constructor(private dreamController: DreamController) {
		this.initRoutes();
	}

	public initRoutes(): void {

		this.router.get(
			`${this.routePrefix}/dream/all-dream-types`,
			cb(this.dreamController.getAllDreamTypes())
		);

		this.router.post(
			`${this.routePrefix}/dream/create`,
			validation(DreamDto),
			cb(this.dreamController.createDream()),
		);
		this.router.post(
			`${this.routePrefix}/dream/:id/update`,
			validation(DreamDto),
			cb(this.dreamController.updateDream()),
		);
		this.router.delete(
			`${this.routePrefix}/dream/:id/delete`,
			cb(this.dreamController.deleteDream()),
		);
		this.router.get(
			`${this.routePrefix}/dream/read`,
			cb(this.dreamController.readDream()),
		);
	}
}

export default Routes;
