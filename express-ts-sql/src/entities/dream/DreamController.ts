import { Request, Response } from 'express';
import { DreamType } from '../../common/enums/dreamType';
import { handleResponse } from '../../common/utils/handleResponse';
import DreamService from './DreamService';

class DreamController {
	private readonly _dreamService: DreamService;

	constructor() {
		this._dreamService = new DreamService();
	}

	getTypes(_: Request, res: Response) {
		handleResponse(res, Object.keys(DreamType));
	}

	async findAll(req: Request, res: Response) {
		return await this._dreamService.findAll(req, res);
	}

	async createDream(req: Request) {
		return await this._dreamService.create(req.body);
	}

	async findOne(req: Request) {
		return await this._dreamService.findOne(req.params.id);
	}

	async updateDream(req: Request) {
		return await this._dreamService.update(req.params.id, req.body);
	}

	async removeDream(req: Request) {
		return await this._dreamService.delete(req.params.id);
	}
}

export default DreamController;
