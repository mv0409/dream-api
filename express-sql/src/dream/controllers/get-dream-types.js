const Dream = require('../../database/models/Dream');
const { httpError } = require('../../helpers/http-error');

const getDreamTypesController = () => {
	return async () => {
		try {
			const types = Dream().rawAttributes.type.values;
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: types,
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
	getDreamTypesController,
};
