const httpError = require('../../helpers/http-error');
const { possibleTypes } = require('../schema/dream-schema');

const getDreamTypesController = () => {
	return async () => {
		try {
			const result = possibleTypes;
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: result,
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
