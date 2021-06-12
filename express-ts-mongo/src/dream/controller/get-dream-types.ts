import { makeHttpError } from '../../helpers/http-error';
import { HttpResponse } from '../../middlewares/express-callback';
import { possibleTypes } from '../schema/dream-schema';

export const dreamTypesController = () => {
	return async (): Promise<HttpResponse> => {
		try {
			const type = possibleTypes;
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				payload: {
					success: true,
					data: type,
				},
			};
		} catch (error) {
			return makeHttpError({
				statusCode: 400,
				errorMessage: error.message,
			});
		}
	};
};
