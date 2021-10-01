import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ErrorHandler from '../../common/errors/HttpError';
import { Dream } from './DreamEntity';


class DreamService {
	private readonly _dreamRepo: Repository<Dream>;
	constructor() {
		this._dreamRepo = getRepository(Dream);
	}

	async findAll(req: Request, res: Response) {
		const [results,total  ] = await this._dreamRepo
			.findAndCount({
				where: res.locals.queryObj,
				take: Number(req.query.limit),
				skip: (Number(req.query.page) - 1) * Number(req.query.limit)
			})
		return {
			data: results,
			count: total
		}
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
