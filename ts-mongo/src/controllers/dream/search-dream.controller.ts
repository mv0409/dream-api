import { Request } from 'express';
import { Dream } from '../../db/entity/dream';
import { makeHttpError } from '../../helpers/errors/http-error';
import { HttpResponse } from '../../helpers/interfaces/http-response';
import { paginate } from '../../helpers/pagination';
import { transformDreamSearch } from '../../helpers/transform/search-dream';

export const SearchDreamController = () => {
	return async (req: Request): Promise<HttpResponse> => {
		try {
			const result = transformDreamSearch(req);
			const count = await Dream.find(
				result.result,
			).countDocuments();
			const data = await Dream.find(result.result)
				.skip(result.startIndex)
				.limit(result.limit);

			const pagination = paginate(req, count);

			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				payload: {
					success: true,
					data,
					count,
					pagination,
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
