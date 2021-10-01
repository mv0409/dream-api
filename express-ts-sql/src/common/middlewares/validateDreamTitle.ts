import { Request, Response, NextFunction } from 'express';
import { handleError } from '../utils/handleError';

export const validateTitle = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.query.title) {
			next();
		} else {
			res.locals.queryObj.$and.push({ title: req.query.title });
			next();
		}
	} catch (error) {
		handleError(res, error);
	}
};
