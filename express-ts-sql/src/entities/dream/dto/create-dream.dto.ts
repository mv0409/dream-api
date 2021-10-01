import { DreamType } from '../../../common/enums/dreamType';
import ErrorHandler from '../../../common/errors/HttpError';
import { handleError } from '../../../common/utils/handleError';
import { Request, Response, NextFunction } from 'express';

export const createDreamDto = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const props = ['title', 'description', 'type', 'date'];
		for (const key in req.body) {
			if (!props.includes(key)) {
				throw new ErrorHandler(
					422,
					`Invalid dream data transfer object, unnecessary prop: ${key}`,
				);
			}
		}
		const title = req.body.title;
		const description = req.body.description;
		const type = req.body.type;
		const date = req.body.date;

		if (!title || !description || !type || !date) {
			throw new ErrorHandler(422, 'Invalid dream data transfer object');
		}

		if (!Object.keys(DreamType).includes(type)) {
			throw new ErrorHandler(422, `Dream type must be one of possible types`);
		}

		req.body.date = new Date(req.body.date);
		if (req.body.date.toString === 'Invalid date') {
			throw new ErrorHandler(400, 'Invalid date');
		}
		next();
	} catch (error) {
		handleError(res, error);
	}
};
