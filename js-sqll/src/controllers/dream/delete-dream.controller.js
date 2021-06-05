import HttpError from '../../helpers/errors/http-error';
import Dream from '../../database/models/dream';

export const DeleteDreamController = () => {
	return async (req) => {
		try {
			const result = await Dream().destroy({
				where: {
					id: req.query.id,
				},
			});
			if (!result) {
				return HttpError({
					statusCode: 422,
					errorMessage: 'Invalid dream id',
				});
			}
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: {
					success: true,
					message: 'Dream Deleted',
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
