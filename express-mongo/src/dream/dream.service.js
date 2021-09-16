'use strict';

const ErrorHandler = require('../common/errors/http-error');
const { Dream } = require('./models/dream');

class DreamServce {
	constructor() {
		this.dreamModel = Dream;
	}

	async findAll(req, res) {
		const dreams = await this.dreamModel
			.find(res.locals.queryObj)
			.limit(req.query.limit)
			.skip((req.query.page - 1) * req.query.limit);
		const count = await this.dreamModel.countDocuments(res.locals.queryObj);
		const parrallelPromise = await Promise.all([dreams, count]);
		return {
			data: parrallelPromise[0],
			count: parrallelPromise[1],
		};
	}

	async create(createDreamDto) {
		const dream = await this.dreamModel.create(createDreamDto);
		if (!dream) throw new ErrorHandler(400, 'Dream not created');
		return dream;
	}

	async findOne(_id) {
		const dream = await this.dreamModel.findOne({ _id });
		if (!dream) throw new ErrorHandler(404, `Dream with id: ${_id} not, found`);
		return dream;
	}

	async update(_id, dreamDto) {
		const updated = await this.dreamModel.findOneAndUpdate(_id, dreamDto, {
			new: true,
		});
		if (!updated)
			throw new ErrorHandler(
				404,
				`Dream with id: ${_id} not found and updated`,
			);
		return updated;
	}

	async delete(_id) {
		const deleted = this.dreamModel.findByIdAndRemove(_id);
		if (!deleted)
			throw new ErrorHandler(
				404,
				`Dream with id: ${_id} not found and deleted`,
			);
		return deleted;
	}
}

module.exports = new DreamServce();
