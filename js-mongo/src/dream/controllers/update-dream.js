const httpError = require('../../helpers/http-error');
const Dream = require('../schema/dream-schema');

const updateDreamController = () => {
	return async (req) => {
		try {
			const updated = await Dream.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: req.body },
				{ new: true },
			);
			if (!updated) {
				throw new Error('Not updated');
			}
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: updated,
			};
		} catch (error) {
			return httpError({
				statusCode: 422,
				errorMessage: error.message,
			});
		}
	};
};

module.exports = {
	updateDreamController,
};
