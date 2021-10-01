import { Request, Response } from 'express';
import { getRepository, Repository, Connection } from 'typeorm';
import ErrorHandler from '../../common/errors/HttpError';
import { Dream } from './DreamEntity';
import { updateDreamDto } from './dto/updateDream.dto';

class DreamService {
	private readonly _dreamRepo: Repository<Dream>;
	constructor() {
		this._dreamRepo = getRepository(Dream);
	}

	async findAll(req: Request, res: Response) {
		console.log(req.body);
		console.log(res.writable);
		const dreams = await this._dreamRepo.find();
		return dreams;
		// 	.find(res.locals.queryObj)
		// 	.limit(req.query.limit)
		// 	.skip((req.query.page - 1) * req.query.limit);
		// const count = await this.dreamModel.countDocuments(res.locals.queryObj);
		// const parrallelPromise = await Promise.all([dreams, count]);
		// return {
		// 	data: parrallelPromise[0],
		// 	count: parrallelPromise[1],
		// };
	}

	async create(createDreamDto: any) {
		const dream = await this._dreamRepo.save(createDreamDto);
		if (!dream) throw new ErrorHandler(400, 'Dream not created');
		return dream;
	}

	async findOne(id: string) {
		const dream = await this._dreamRepo.findOne({ where: { id: Number(id) } });
		if (!dream) throw new ErrorHandler(404, `Dream with id: ${id} not, found`);
		return dream;
	}

	async update(id: string, updateDreamDto: any) {
		const updated = await this._dreamRepo.save(
			{ id: Number(id) },
			updateDreamDto,
		);
		if (!updated)
			throw new ErrorHandler(404, `Dream with id: ${id} not found and updated`);
		return updated;
	}

	async delete(id: string) {
		const deleted = await this._dreamRepo.delete(id);
		if (!deleted.affected)
			throw new ErrorHandler(404, `Dream with id: ${id} not found and deleted`);
		return deleted;
	}
}

export default DreamService;
