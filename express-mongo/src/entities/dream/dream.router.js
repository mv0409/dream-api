'use strict';

const { Router } = require('express');
const DreamController = require('./dream.controller');
const autoBind = require('auto-bind');
const callback = require('../../common/middlewares/promise-callback');
const validateMongoId = require('../../common/middlewares/validate-mongo-id');
const createDreamDto = require('./dto/create-dream.dto');
const updateDreamDto = require('./dto/update-dream.dto');
const validatePagination = require('../../common/middlewares/validate-pagination');
const validateDreamType = require('../../common/middlewares/validate-dream-type');
const validateDate = require('../../common/middlewares/validate-date');
const validateTitle = require('../../common/middlewares/validate-title');

class DreamRouter {
  _controller = DreamController;
  _router = Router();

  constructor() {
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
      validateDate,
      validateDreamType,
      validateTitle,
      validatePagination,
      callback(this._controller.findAll)
    );
    this._router.post('/', createDreamDto, callback(this._controller.createDream));
    this._router.get('/:id', validateMongoId, callback(this._controller.findOne));
    this._router.patch(
      '/:id',
      validateMongoId,
      updateDreamDto,
      callback(this._controller.updateDream)
    );
    this._router.delete('/:id', validateMongoId, callback(this._controller.removeDream));
  }
}

module.exports = new DreamRouter().router;
