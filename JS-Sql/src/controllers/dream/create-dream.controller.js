import HttpError from '../../helpers/errors/http-error';
import { Dream } from '../../../database/models';

export const CreateDreamController = () => {
	return async (req) => {
		try {
			const dream = await Dream.create(req.body);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				data: {
					success: true,
					message: 'User Created',
					payload: dream,
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
