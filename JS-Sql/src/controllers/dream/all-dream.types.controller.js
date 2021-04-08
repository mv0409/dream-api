import Dream from '../../database/models/dream';
import HttpError from '../../helpers/errors/http-error';

export const AllDreamTypesController = () => {
	return async () => {
		try {
			const result = Dream().rawAttributes.type.values;
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: {
					success: true,
					dreamTypes: result,
				},
			};
		} catch (error) {
			return HttpError({
				statusCode: 500,
				errorMessage: error.message,
			});
		}
	};
};
