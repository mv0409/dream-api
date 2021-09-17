'use strict';

const { possibleTypes } = require('../../entities/dream/models/dream');
const ErrorHandler = require('../errors/http-error');
const handleError = require('../utils/handle-error');

const validateDreamType = (req, res, next) => {
	try {
		if (!req.query.type) {
			next();
		} else if (!possibleTypes.includes(req.query.type)) {
			throw new ErrorHandler(
				400,
				`Dream type must be one of possible types / (${possibleTypes})`,
			);
		} else {
			res.locals.queryObj.$and.push({ type: req.query.type });
			next();
		}
	} catch (error) {
		handleError(res, error);
	}
};

module.exports = validateDreamType;
