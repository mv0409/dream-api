import { Request } from 'express';
import { Dream } from '../../db/models/dream';
import { makeHttpError } from '../../helpers/errors/http-error';
import { HttpResponse } from '../../helpers/interfaces/http-response';

export const DeleteDreamController = () => {
	return async (req: Request): Promise<HttpResponse> => {
		try {
			const result = req.params;

			await Dream.findOneAndDelete({
				_id: result.id
			});

			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				payload: {
					success: true,
					data: 'Dream has been deleted successfully',
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
