'use strict';

const { possibleTypes } = require('../../entities/dream/models/dream');
const { throwBadRequestError } = require('../errors/http-error');
const handleError = require('../utils/handle-error');

const validateDreamType = (req, res, next) => {
  try {
    if (!req.query.type) {
      next();
    } else if (possibleTypes.includes(req.query.type)) {
      res.locals.queryObj.$and.push({ type: req.query.type });
      next();
    } else {
      throwBadRequestError(`Dream type must be one of possible types / (${possibleTypes})`);
    }
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = validateDreamType;
