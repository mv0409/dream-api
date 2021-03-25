import express, { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import logging from '../../../helpers/log/logging';

export const validation = (type: any): express.RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const errors: ValidationError[] = await validate(
			plainToClass<never, Request>(type, req.body),
		);
		if (errors.length > 0) {
			logging.error('SERVER', 'wrong input');
			res.status(422);
			res.send({
				sucess: false,
				data: 'Wrong input',
			});
		} else {
			next();
		}
	};
};
