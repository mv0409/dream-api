'use strict';

const handleResponse = require('../../common/utils/handle-response');
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
    return this.dreamService.findAll(req, res);
  }

  async createDream(req) {
    return this.dreamService.create(req.body);
  }

  async findOne(req) {
    return this.dreamService.findOne(req.params.id);
  }

  async updateDream(req) {
    return this.dreamService.update(req.params.id, req.body);
  }

  async removeDream(req) {
    return this.dreamService.delete(req.params.id);
  }
}

module.exports = new DreamController();
