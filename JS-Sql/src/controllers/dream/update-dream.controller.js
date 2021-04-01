import HttpError from '../../helpers/errors/http-error';
import { Dream } from '../../../database/models';

export const UpdateDreamController = () => {
	return async (req) => {
		try {
			await Dream.update(req.body, {
				where: {
					id: req.params.id,
				},
			});
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				data: {
					success: true,
					message: 'Dream Updated',
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
