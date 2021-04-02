export const paginate = (reqParams, count) => {
	const pagination = {};
	const page = parseInt(reqParams.page);
	const limit = parseInt(reqParams.limit);
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
