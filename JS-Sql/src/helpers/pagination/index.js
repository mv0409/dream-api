export const paginate = (pageParam, limitParam, totalResults) => {
	const pagination = {};
	const page = parseInt(pageParam);
	const limit = parseInt(limitParam);
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	if (startIndex > 0) {
		pagination.previous = {
			page: page - 1,
			limit: limit,
		};
	}

	if (endIndex < totalResults) {
		pagination.next = {
			page: page + 1,
			limit: limit,
		};
	}
	return { pagination, page, limit, startIndex, endIndex, totalResults };
};
