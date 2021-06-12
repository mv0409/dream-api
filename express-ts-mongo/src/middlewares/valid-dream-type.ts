import { NextFunction, Request, Response } from 'express';
import { possibleTypes } from '../dream/schema/dream-schema';

export const validDreamType = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const type = req.params.type;
	if (!type) {
		next();
	}
	if (!possibleTypes.includes(type)) {
		res.status(422);
		res.send({
			error: `type must be one of possible types / (${possibleTypes})`,
		});
	} else {
		next();
	}
};
