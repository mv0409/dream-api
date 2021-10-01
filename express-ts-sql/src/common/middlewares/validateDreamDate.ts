import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../errors/HttpError';
import { handleError } from '../utils/handleError';

export const validateDate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		res.locals = { queryObj: { $and: [] } };
		const startDate = req.query.startDate as string;
		const endDate = req.query.endDate as string;
		if (!startDate && !endDate) {
			res.locals.queryObj.$and.push({ date: { $lt: new Date() } });
		}
		if (startDate && !endDate) {
			const _startDate = new Date(startDate);
			if (_startDate.toString() === 'Invalid Date') {
				throw new ErrorHandler(422, 'Invalid date format');
			}
			res.locals.queryObj.$and.push({ date: { $gt: _startDate } });
		}
		if (!startDate && endDate) {
			const _endDate = new Date(endDate);
			if (endDate.toString() === 'Invalid Date') {
				throw new ErrorHandler(422, 'Invalid date format');
			}
			_endDate.setHours(_endDate.getHours() + 24);
			res.locals.queryObj.$and.push({ date: { $lt: _endDate } });
		}
		if (startDate && endDate) {
			const _startDate = new Date(startDate);
			const _endDate = new Date(endDate);
			if (
				_startDate.toString() === 'Invalid Date' ||
				_endDate.toString() === 'Invalid Date'
			) {
				throw new ErrorHandler(422, 'Invalid date');
			}
			if (startDate > endDate) {
				throw new ErrorHandler(422, 'Start date must happen before end date');
			}
			_endDate.setHours(_endDate.getHours() + 24);
			res.locals.queryObj.$and.push({
				date: { $gt: _startDate, $lt: _endDate },
			});
		}
		next();
	} catch (error) {
		handleError(res, error);
	}
};
