const { httpError } = require('../../helpers/http-error');
const { CustomError } = require('../../helpers/controller-error');
const Dream = require('../../database/models/Dream')

const deleteDreamController = () => {
	return async (req) => {
		try {
			const removed = await findAndDelete(req.params.id);
			checkDreamRemoved(removed);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: removed,
			};
		} catch (error) {
			return httpError({
				statusCode: error.statusCode,
				errorMessage: error.message,
			});
		}
	};
};

const findAndDelete = async (id) => {
	return await Dream().findOne({
		where: {
			id
		}
	});
};
const checkDreamRemoved = (dream) => {
	if (!dream) {
		throw new CustomError(401, 'Failed to remove dream');
	}
	return dream;
};

module.exports = { deleteDreamController, checkDreamRemoved };
