'use strict';

const handleResponse = require('../common/utils/handle-response');
const DreamService = require('./dream.service');
const { possibleTypes } = require('./models/dream');

class DreamController {
	constructor() {
		this.dreamService = DreamService;
	}

	getTypes(req, res) {
		handleResponse(res, possibleTypes);
	}

	async findAll(req, res) {
		return await this.dreamService.findAll(req, res);
	}

	async createDream(req) {
		return await this.dreamService.create(req.body);
	}

	async findOne(req) {
		return await this.dreamService.findOne(req.params.id);
	}

	async updateDream(req) {
		return await this.dreamService.update(req.params.id, req.body);
	}

	async removeDream(req) {
		return await this.dreamService.delete(req.params.id);
	}
}

module.exports = new DreamController();
