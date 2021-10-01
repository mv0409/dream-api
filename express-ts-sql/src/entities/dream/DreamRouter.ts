import { Router } from 'express';
import DreamController from './DreamController';
import autoBind from 'auto-bind';
import { callback } from '../../common/middlewares/promiseCallback';
import { validateId } from '../../common/middlewares/validateId';
import { createDreamDto } from './dto/create-dream.dto';
import { updateDreamDto } from './dto/updateDream.dto';
import { validatePagination } from '../../common/middlewares/validatePagination';
import { validateDate } from '../../common/middlewares/validateDreamDate';
import { validateTitle } from '../../common/middlewares/validateDreamTitle';
import { validateType } from '../../common/middlewares/validateDreamType';

class DreamRouter {
	_router = Router();
	_controller: DreamController;

	constructor() {
		this._controller = new DreamController();
		autoBind(this._controller);
		this._configure();
	}

	get router() {
		return this._router;
	}

	_configure() {
		this._router.get('/types', this._controller.getTypes);
		this._router.get(
			'',
			validatePagination,
			validateDate,
			validateTitle,
			validateType,
			callback(this._controller.findAll),
		);
		this._router.get('/:id', validateId, callback(this._controller.findOne));
		this._router.post(
			'',
			createDreamDto,
			callback(this._controller.createDream),
		);
		this._router.patch(
			'/:id',
			validateId,
			updateDreamDto,
			callback(this._controller.updateDream),
		);
		this._router.delete(
			'/:id',
			validateId,
			callback(this._controller.removeDream),
		);
	}
}

export default DreamRouter;
