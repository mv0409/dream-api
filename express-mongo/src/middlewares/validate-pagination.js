const isValidPagination = (req, res, next) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	if (!page && !limit) {
		res.status(422);
		res.send({
			error: 'Invalid query, include page and limit in url path',
		});
	} else if (isNaN(page) || isNaN(limit)) {
		res.status(422);
		res.send({
			error: 'Invalid limit or page param provided',
		});
	} else {
		next();
	}
};

module.exports = {
	isValidPagination,
};
