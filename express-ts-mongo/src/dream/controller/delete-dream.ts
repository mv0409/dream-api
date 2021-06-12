import { Request } from 'express';
import { makeHttpError } from '../../helpers/http-error';
import { HttpResponse } from '../../middlewares/express-callback';
import { Dream } from '../schema/dream-schema';

export const deleteDreamController = () => {
	return async (req: Request): Promise<HttpResponse> => {
		try {
			const result = req.params;

			const deleted = await Dream.findOneAndDelete({
				_id: result.id,
			});
			if(!deleted) {
				throw new CustomError(404, "Dream not found")
			}
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				payload: {
					success: true,
					data:
						'Dream has been deleted successfully',
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
