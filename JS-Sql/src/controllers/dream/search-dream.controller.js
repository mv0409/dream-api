import HttpError from '../../helpers/errors/http-error';
import { Dream } from '../../../database/models';
import { paginate } from '../../helpers/pagination';

export const SearchDreamController = () => {
	return async (req) => {
		try {
			const totalResults = await Dream.count();

			const pagination = paginate(
				req.query.page,
				req.query.limit,
				totalResults,
			);
			const result = await Dream.findAll({
				where: req.body,
				offset: pagination.startIndex,
				limit: pagination.limit,
			});

			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: {
					success: true,
					payload: result,
					pagination: pagination.pagination,
				},
			};
		} catch (error) {
			return HttpError({
				statusCode: 500,
				errorMessage: error.message,
			});
		}
	};
};
