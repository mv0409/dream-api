import { Response } from 'express';
import ErrorHandler from '../errors/HttpError';

export const handleError = (res: Response, err: ErrorHandler) =>
	res
		.status(err.code || 500)
		.send({ error: err.message })
		.end();
