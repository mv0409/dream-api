'use strict';

const { isValidObjectId } = require('mongoose');
const { throwBadRequestError } = require('../errors/http-error');
const handleError = require('../utils/handle-error');

const validateMongoId = (req, res, next) => {
  try {
    if (!req.params.id) throwBadRequestError('Include id param in request');
    if (!isValidObjectId(req.params.id)) throwBadRequestError('Not valid mongo id');
    next();
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = validateMongoId;
