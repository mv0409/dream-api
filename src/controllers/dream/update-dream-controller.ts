import { Request } from 'express';
import { Dream } from '../../db/entity/dream';
import { makeHttpError } from '../../helpers/errors/http-error';
import { HttpResponse } from '../../helpers/interfaces/http-response';

export const UpdateDreamController = () => {
	return async (req: Request): Promise<HttpResponse> => {
		try {
			const result = req.params;
			const updateDream = req.body

			const dream = await Dream.findOneAndUpdate(
				{
					_id: result.id,
				},
				{ 
					title : updateDream.title,
					description: updateDream.description,
					date: updateDream.date,
					type: updateDream.type
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
					message: 'Dream has been updated successfully',
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
