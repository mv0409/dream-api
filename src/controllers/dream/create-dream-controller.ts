import { Request } from 'express';
import { Dream } from '../../db/models/dream';
import { makeHttpError } from '../../helpers/errors/http-error';
import { HttpResponse } from '../../helpers/interfaces/http-response';

export const CreateDreamController = () => {
	return async (req: Request) : Promise<HttpResponse>  => {
		try {
			const result = req.body;

			const dream =  await Dream.create(result);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				payload: {
					success: true,
					message: 'Dream has been created successfully',
					data: dream,
				},
			};
		} catch (error) {
			return makeHttpError({
				statusCode: 409,
				errorMessage: error.message
			})
		}
	};
};
