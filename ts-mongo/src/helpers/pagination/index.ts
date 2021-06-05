import { Request } from 'express';
import { PagionationInterface } from '../interfaces/pagination.interface';

export const paginate = (req: Request, count: number): PagionationInterface => {
	const pagination: PagionationInterface = {};
	const page = parseInt(req.params.page);
	const limit = parseInt(req.params.limit);
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	if (startIndex > 0) {
		pagination.previous = {
			page: page - 1,
			limit: limit,
		};
	}

	if (endIndex < count) {
		pagination.next = {
			page: page + 1,
			limit: limit,
		};
	}
	return pagination;
};
