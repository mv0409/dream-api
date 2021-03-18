import express, { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export const validation = (type: any): express.RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const errors: ValidationError[] = await validate(
			plainToClass(type, req.body),
		);
		if (errors.length > 0) {
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
