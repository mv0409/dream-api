import HttpError from '../../helpers/errors/http-error';
import Dream from '../../database/models/dream';

export const UpdateDreamController = () => {
	return async (req) => {
		try {
			const [numberOfAffectedRows] = await Dream().update(
				req.body,
				{
					where: {
						id: req.query.id,
					},
				},
			);
			if (!numberOfAffectedRows) {
				return HttpError({
					statusCode: 422,
					errorMessage: 'Invalid dream id',
				});
			}
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
