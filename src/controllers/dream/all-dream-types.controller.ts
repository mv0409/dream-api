import { possibleTypes } from '../../db/entity/dream';
import { makeHttpError } from '../../helpers/errors/http-error';
import { HttpResponse } from '../../helpers/interfaces/http-response';

export const AllDreamTypesController = () => {
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
