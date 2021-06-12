const { CustomError } = require('../../helpers/controller-error');
const { httpError } = require('../../helpers/http-error');
const { Dream } = require('../schema/dream-schema');

const updateDreamController = () => {
	return async (req) => {
		try {
			const updated = await findDreamAndUpdate(
				req.params.id,
				req.body,
			);
			checkDreamUpdate(updated);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: updated,
			};
		} catch (error) {
			return httpError({
				statusCode: error.statusCode,
				errorMessage: error.message,
			});
		}
	};
};

const findDreamAndUpdate = async (id, dream) => {
	return await Dream.findOneAndUpdate(
		{ _id: id },
		{ $set: dream },
		{ new: true },
	);
};

const checkDreamUpdate = (dream) => {
	if (!dream) {
		throw new CustomError(422, 'Dream update fail');
	}
	return dream;
};

module.exports = {
	updateDreamController,
	checkDreamUpdate,
};
