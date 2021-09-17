'use strict';

const ErrorHandler = require('../../../common/errors/http-error');
const handleError = require('../../../common/utils/handle-error');
const { possibleTypes } = require('../models/dream');

const updateDreamDto = (req, res, next) => {
	try {
		const props = ['title', 'description', 'type', 'date'] 
		for(const key in req.body) {
			if(!props.includes(key)) {
				throw new ErrorHandler(422, `Invalid dream data transfer object, unnecessary prop: ${key}` )
			}
		}
		const title = req.body.title;
		const description = req.body.description;
		const type = req.body.type;
		const date = req.body.date;

		if (!title || !description || !type || !date) {
			throw new ErrorHandler(422, 'Invalid dream data transfer object');
		}

		if (!possibleTypes.includes(type)) {
			throw new ErrorHandler(422, `Dream types must be ${possibleTypes}`);
		}

		req.body.date = new Date(req.body.date);
		if (req.body.date.toString === 'Invalid date') {
			throw new ErrorHandler(400, 'Invalid date');
		}

		next();
	} catch (error) {
		handleError(res, error);
	}
};

module.exports = updateDreamDto;
