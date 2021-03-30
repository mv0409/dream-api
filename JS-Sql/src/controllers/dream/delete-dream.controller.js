import HttpError from '../../helpers/errors/http-error';
import { Dream } from '../../../database/models';

export const DeleteDreamController = () => {
	return async (req) => {
		try {
			await Dream.destroy({
				where: {
					id: req.params.id,
				},
			});
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: {
					success: true,
					message: 'User Deleted',
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
