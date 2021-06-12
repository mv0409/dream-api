const { httpError } = require('../../helpers/http-error');
const { CustomError } = require('../../helpers/controller-error');
const Dream = require('../../database/models/Dream');

const getDreamsController = () => {
	return async (req) => {
		try {
			const query = transformSearch(req);
			const dreams = await findDream(query);
			checkDreamsFound(dreams);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				data: {
					count: dreams.length,
					dreams,
				},
			};
		} catch (error) {
			return httpError({
				statusCode: 422,
				errorMessage: error.message,
			});
		}
	};
};

const transformSearch = (req) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const type = req.query.type;
	const title = req.query.title;
	const offset = (page - 1) * limit;
	const query = {};
	if (type) query.type = type;
	if (title) query.title = title;

	if (req.query.startDate && !req.query.endDate) {
		query.date = {
			$gt: new Date(req.query.startDate),
		};
	}

	if (!req.query.startDate && req.query.endDate) {
		query.date = {
			$lt: new Date(req.query.endDate),
		};
	}

	if (req.query.startDate && req.query.endDate) {
		query.date = {
			$gt: new Date(req.query.startDate),
			$lt: new Date(req.query.endDate),
		};
	}

	return {
		where: query,
		offset,
		limit,
	};
};

const findDream = async (param) => {
	const query = param.where
	return await Dream().findAll({
		where: {
			query
		}
	})
};

const checkDreamsFound = (dreams) => {
	if (!dreams.length) {
		throw new CustomError(401, 'No Dreams found');
	} else {
		return dreams;
	}
};

module.exports = {
	getDreamsController,
};
