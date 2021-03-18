import { Dream } from '../../db/models/dream';
import { makeHttpError } from '../../helpers/errors/http-error';
import { HttpResponse } from '../../helpers/interfaces/http-response';

export const ReadDreamController = () => {
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
				errorMessage: error.message
			})
		}
	};
};
