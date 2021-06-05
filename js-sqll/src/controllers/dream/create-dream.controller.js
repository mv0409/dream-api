import HttpError from '../../helpers/errors/http-error';
import Dream from '../../database/models/dream';

export const CreateDreamController = () => {
	return async (req) => {
		try {
			const dream = await Dream().create(req.body);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				data: {
					success: true,
					message: 'Dream Created',
					dream,
				},
			};
		} catch (error) {
			return HttpError({
				statusCode: 422,
				errorMessage: error.message,
			});
		}
	};
};
