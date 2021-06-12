import { NextFunction, Request, Response } from 'express';

export const isValidPagination = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const page = req.query.page;
	const limit = req.query.limit;
	if (!page && !limit) {
		res.status(422);
		res.send({
			error:
				'Invalid query, include page and limit in url path',
		});
	} else {
		next();
	}
};
