import { Request } from 'express';
import { makeHttpError } from '../../helpers/http-error';
import { HttpResponse } from '../../middlewares/express-callback';
import { Dream } from '../schema/dream-schema';

export const createDreamController = () => {
	return async (req: Request): Promise<HttpResponse> => {
		try {
			const result = req.body;
			const dream = await Dream.create(result);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				payload: {
					success: true,
					message:
						'Dream has been created successfully',
					data: dream,
				},
			};
		} catch (error) {
			console.log(error);
			return makeHttpError({
				statusCode: 409,
				errorMessage: error.message,
			});
		}
	};
};
