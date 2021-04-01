import HttpError from '../../helpers/errors/http-error';
import { Dream } from '../../../database/models';

export const ReadDreamController = () => {
	return async () => {
		try {
			const dreams = await Dream.findAll();
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: {
					success: true,
					payload: dreams,
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
