const { CustomError } = require('../../helpers/controller-error');
const { httpError } = require('../../helpers/http-error');
const Dream = require('../../database/models/Dream')

const createDreamController = () => {
	return async (req) => {
		try {
			const dream = await dreamCreate(req.body);
			checkDreamCreated(dream);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				data: dream,
			};
		} catch (error) {
			return httpError({
				statusCode: error.statusCode,
				errorMessage: error.message,
			});
		}
	};
};

const dreamCreate = async (dream) => {
	return await Dream().create({
		title: dream.title,
		description: dream.description,
		date: new Date(dream.date),
		type: dream.type,
	});
};

const checkDreamCreated = (dream) => {
	if (!dream) {
		throw new CustomError(401, 'Dream creation failed');
	}
	return dream;
};

module.exports = { createDreamController, checkDreamCreated };
