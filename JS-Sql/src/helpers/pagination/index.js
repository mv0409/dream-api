const paginate = (req, count) => {
	const pagination = {};
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	if (startIndex > 0) {
		pagination.previous = {
			page: page - 1,
			limit,
		};
	}

	if (endIndex < count) {
		pagination.next = {
			page: page + 1,
			limit,
		};
	}
	return pagination;
};
export default paginate