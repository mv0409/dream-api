import { makeHttpError } from '../../helpers/http-error';
import { HttpResponse } from '../../middlewares/express-callback';
import { Dream } from '../schema/dream-schema';

export const getDreamController = () => {
	return async (): Promise<HttpResponse> => {
		try {
			const dream = await Dream.find();

			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				payload: {
					success: true,
					data: dream,
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
