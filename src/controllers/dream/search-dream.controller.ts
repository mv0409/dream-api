import { Request } from 'express';
import { Dream } from '../../db/entity/dream';
import { makeHttpError } from '../../helpers/errors/http-error';
import { DateFormated } from '../../helpers/interfaces/date-formated';
import { HttpResponse } from '../../helpers/interfaces/http-response';
import { PagionationInterface } from '../../helpers/interfaces/pagination.interface';

export const SearchDreamController = () => {
	return async (req: Request): Promise<HttpResponse> => {
		try {
			const result = req.body;
			const page = parseInt(req.query.page as string);
			const limit = parseInt(req.query.limit as string);
			const startIndex = (page - 1) * limit;
			const endIndex = page * limit;

			if (result.dateBetween) {
				const date = new DateFormated(
					result.dateBetween.gt,
					result.dateBetween.lt,
				);
				delete result.dateBetween;
				Object.assign(result, date);
			}
			const totalResults = await Dream.find(
				result,
			).countDocuments();

			const dream = await Dream.find(result)
				.skip(startIndex)
				.limit(limit);

			const pagination: PagionationInterface = {};

			if (startIndex > 0) {
				pagination.prev = {
					page: page - 1,
					limit: limit,
				};
			}

			if (endIndex < totalResults) {
				pagination.next = {
					page: page + 1,
					limit: limit,
				};
			}

			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				payload: {
					success: true,
					data: dream,
					pagination: pagination,
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
