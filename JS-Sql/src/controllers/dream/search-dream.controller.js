import HttpError from '../../helpers/errors/http-error';
import { Dream } from '../../../database/models';

export const SearchDreamController = () => {
	return async (req) => {
		try {
			const result = req.body
			const page = parseInt(req.query.page);
			const limit = parseInt(req.query.limit)
			const pagination = {};
			const startIndex = (page - 1) * limit;
			const endIndex = page * limit;

			if(result.dateBetween) {
				const startDate = new Date(result.dateBetween.startDate.toString())
				const endDate = new Date(result.dateBetween.endDate.toString())
				const {count, rows} = await Dream.findAndCountAll({
					from: {
						$between: [startDate, endDate]
					},
					where: result,
					offset: startIndex,
					limit: limit,
				});
				if(count == 0) {
					return HttpError({
						statusCode: 409,
						errorMessage: 'No data'
					})
				}

				if (startIndex > 0) {
					pagination.previous = {
						page: page - 1,
						limit: limit,
					};
				}
			
				if (endIndex < count) {
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
					data: {
						success: true,
						payload: rows,
						pagination: pagintion,
					},
				};
			}

			const {count, rows} = await Dream.findAndCountAll({
				where: result,
				offset: startIndex,
				limit: limit,
			});

			

			if(count == 0) {
				return HttpError({
					statusCode: 409,
					errorMessage: 'No data'
				})
			}

			if (startIndex > 0) {
				pagination.previous = {
					page: page - 1,
					limit: limit,
				};
			}
		
			if (endIndex < count) {
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
				data: {
					success: true,
					payload: rows,
					pagination: pagination,
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
