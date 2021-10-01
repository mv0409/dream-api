import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../errors/HttpError';
import { handleError } from '../utils/handleError';

export const validatePagination = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);
		if (!page || !limit)
			throw new ErrorHandler(
				422,
				'Invalid query, include page and limit in url path',
			);
		if (isNaN(page) || isNaN(limit)) {
			throw new ErrorHandler(422, 'Invalid limit or page param provided');
		}
		next();
	} catch (error) {
		handleError(res, error);
	}
};
