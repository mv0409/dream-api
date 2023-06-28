'use strict';

const { throwBadRequestError, throwNotFoundError } = require('../../common/errors/http-error');
const { Dream } = require('./models/dream');

class DreamServce {
  constructor() {
    this.dreamModel = Dream;
  }

  async findAll(req, res) {
    const [data, count] = await Promise.all([
      this.dreamModel
        .find(res.locals.queryObj)
        .limit(req.query.limit)
        .skip((req.query.page - 1) * req.query.limit),
      this.dreamModel.countDocuments(res.locals.queryObj)
    ]);
    return {
      data,
      count
    };
  }

  async create(createDreamDto) {
    const dream = await this.dreamModel.create(createDreamDto);
    if (!dream) throwBadRequestError('Dream not created');
    return dream;
  }

  async findOne(id) {
    const dream = await this.dreamModel.findOne({ _id: id });
    if (!dream) throwNotFoundError(`Dream with id: ${id} not, found`);
    return dream;
  }

  async update(id, dreamDto) {
    const updated = await this.dreamModel.findOneAndUpdate({ _id: id }, dreamDto, { new: true });
    if (!updated) throwNotFoundError(`Dream with id: ${id} not found and updated`);
    return updated;
  }

  async delete(id) {
    const deleted = this.dreamModel.findByIdAndRemove(id);
    if (!deleted) throwNotFoundError(`Dream with id: ${id} not found and deleted`);
    return deleted;
  }
}

module.exports = new DreamServce();
