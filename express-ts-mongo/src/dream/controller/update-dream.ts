import { Request } from 'express';
import { makeHttpError } from '../../helpers/http-error';
import { HttpResponse } from '../../middlewares/express-callback';
import { Dream } from '../schema/dream-schema';

export const updateDreamController = () => {
	return async (req: Request): Promise<HttpResponse> => {
		try {
			const result = req.params;
			const updateDream = req.body;

			const dream = await Dream.findOneAndUpdate(
				{
					_id: result.id,
				},
				{
					title: updateDream.title,
					description: updateDream.description,
					date: updateDream.date,
					type: updateDream.type,
				},
				{ new: true },
			);

			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 204,
				payload: {
					success: true,
					message:
						'Dream has been updated successfully',
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
