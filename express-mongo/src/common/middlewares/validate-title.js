'use strict';

const handleError = require('../utils/handle-error');

const validateTitle = (req, res, next) => {
  try {
    if (req.query.title) {
      res.locals.queryObj.$and.push({ title: req.query.title });
    }
    next();
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = validateTitle;
