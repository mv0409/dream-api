'use strict';

const { throwBadRequestError } = require('../errors/http-error');
const handleError = require('../utils/handle-error');

const validatePagination = (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    if (!page || !limit) throwBadRequestError('Invalid query, include page and limit in url path');
    if (isNaN(page) || isNaN(limit)) throwBadRequestError('Invalid limit or page param provided');
    req.query.page = page;
    req.query.limit = limit;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = validatePagination;
