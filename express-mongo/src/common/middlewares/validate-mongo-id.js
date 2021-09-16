'use strict';

const { ObjectID } = require('mongodb');
const { isValidObjectId } = require('mongoose');
const ErrorHandler = require('../errors/http-error');
const handleError = require('../utils/handle-error');

const validateMongoId = (req, res, next) => {
	try {
		if (!req.params.id)
			throw new ErrorHandler(422, 'Include id param in request');
		if (!isValidObjectId(req.params.id))
			throw new ErrorHandler(400, 'Not valid mongo id');
		req.params.id = ObjectID.createFromHexString(req.params.id);
		next();
	} catch (error) {
		handleError(res, error);
	}
};

module.exports = validateMongoId;
