import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../errors/HttpError';
import { handleError } from '../utils/handleError';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.params.id) {
			throw new ErrorHandler(422, 'Include id param in request');
		}
		const validate = Number(req.params.id);
		if (isNaN(validate)) {
			throw new ErrorHandler(422, 'Invalid id format');
		}
		next();
	} catch (error) {
		handleError(res, error);
	}
};
