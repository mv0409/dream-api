export const transformDreamSearch = (req) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const queryStartDate = req.query.startDate;
	const queryEndDate = req.query.endDate;
	const startIndex = (page - 1) * limit;

	if (queryEndDate && queryStartDate) {
		const startDate = new Date(queryStartDate.toString());
		const endDate = new Date(queryEndDate.toString());
		return {
			from: {
				$between: [startDate, endDate],
			},
			where: req.body,
			offset: startIndex,
			limit: limit,
		};
	}

	return {
		where: req.body,
		offset: startIndex,
		limit: limit,
	};
};
