import HttpError from '../../helpers/errors/http-error';
import Dream from '../../database/models/dream';
import { paginate } from '../../helpers/pagination';

export const SearchDreamController = () => {
	return async (req) => {
		try {
			const result = Dream().transformSearch(req);

			const { count, rows } = await Dream().findAndCountAll(
				result,
			);

			const pagination = paginate(req.params, count);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				data: {
					success: true,
					payload: rows,
					count,
					pagination,
				},
			};
		} catch (error) {
			return HttpError({
				statusCode: 406,
				errorMessage: error.message,
			});
		}
	};
};
