import { Request } from 'express';
import { TransformDreamSearchInterface } from '../interfaces/transform-dream.interface';

/*eslint @typescript-eslint/no-explicit-any:*/
export const transformDreamSearch = (
	req: Request,
): TransformDreamSearchInterface => {
	const page = parseInt(req.query.page as string);
	const limit = parseInt(req.query.limit as string);
	const queryStartDate = req.query.startDate as string;
	const queryEndDate = req.query.endDate as string;
	const startIndex = (page - 1) * limit;
	const result = req.body;

	if (queryEndDate && queryStartDate) {
		const startDate = new Date(queryStartDate.toString());
		const endDate = new Date(queryEndDate.toString());
		const date = {
			gt: startDate,
			lt: endDate,
		};
		Object.assign(result, date);
		return {
			result,
			startIndex,
			limit,
		};
	}

	return {
		result,
		startIndex,
		limit,
	};
};
