import { NextFunction, Request, Response } from 'express';
import { DreamType } from '../enums/dreamType';
import ErrorHandler from '../errors/HttpError';
import { handleError } from '../utils/handleError';

export const validateType = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.query.type) {
			next();
		} else if (!Object.keys(DreamType).includes(req.query.type as string)) {
			throw new ErrorHandler(400, `Dream type must be one of possible types`);
		} else {
			res.locals.queryObj.$and.push({ type: req.query.type });
			next();
		}
	} catch (error) {
		handleError(res, error);
	}
};
