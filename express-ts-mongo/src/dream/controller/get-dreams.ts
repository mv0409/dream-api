// import { Request } from 'express';
import { makeHttpError } from '../../helpers/http-error';
import { HttpResponse } from '../../middlewares/express-callback';
// import { Dream } from '../schema/dream-schema';

export const getDreamsController = () => {
	// return async (req: Request): Promise<HttpResponse> => {
	return async (): Promise<HttpResponse> => {
		try {
			// const result = transformDreamSearch(req);
			// const count = await Dream.find(
			// 	result.result,
			// ).countDocuments();
			// const data = await Dream.find(result.result)
			// 	.skip(result.startIndex)
			// 	.limit(result.limit);

			// const pagination = paginate(req, count);

			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				payload: {
					success: true,
				},
			};
		} catch (error) {
			return makeHttpError({
				statusCode: 409,
				errorMessage: error.message,
			});
		}
	};
};
