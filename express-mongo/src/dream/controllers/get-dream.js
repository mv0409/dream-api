const { CustomError } = require('../../helpers/controller-error');
const { httpError } = require('../../helpers/http-error');
const Dream = require('../schema/dream-schema');

const getDreamController = () => {
	return async (req) => {
		try {
			const dream = await findDreamById(req.params.id);
			checkDream(dream);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
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

const findDreamById = async (id) => {
	return Dream.findById(id);
};

const checkDream = (dream) => {
	if (!dream) {
		throw new CustomError(404, 'Dream not found');
	}
	return dream;
};

module.exports = {
	getDreamController,
	checkDream,
	findDreamById,
};
