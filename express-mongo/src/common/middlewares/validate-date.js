'use strict';

const { throwBadRequestError } = require('../errors/http-error');
const handleError = require('../utils/handle-error');

const validateDate = (req, res, next) => {
  try {
    res.locals = { queryObj: { $and: [] } };
    let startDate = req.query.startDate || undefined;
    let endDate = req.query.endDate || undefined;
    if (!startDate && !endDate) {
      res.locals.queryObj.$and.push({ date: { $lt: new Date() } });
    }
    if (startDate && !endDate) {
      startDate = new Date(startDate);
      if (startDate.toString() === 'Invalid Date') {
        throwBadRequestError('Invalid date format');
      }
      res.locals.queryObj.$and.push({ date: { $gt: startDate } });
    }
    if (!startDate && endDate) {
      endDate = new Date(endDate);
      if (endDate.toString() === 'Invalid Date') {
        throwBadRequestError('Invalid date format');
      }
      endDate.setHours(endDate.getHours() + 24);
      res.locals.queryObj.$and.push({ date: { $lt: endDate } });
    }
    if (startDate && endDate) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      if (startDate.toString() === 'Invalid Date' || endDate.toString() === 'Invalid Date') {
        throwBadRequestError('Invalid date');
      }
      if (startDate > endDate) {
        throwBadRequestError('Start date must happen before end date');
      }
      endDate.setHours(endDate.getHours() + 24);
      res.locals.queryObj.$and.push({
        date: { $gt: startDate, $lt: endDate }
      });
    }
    next();
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = validateDate;
