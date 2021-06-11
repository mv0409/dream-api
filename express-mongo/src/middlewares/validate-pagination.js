const isValidPagination = (req, res, next) => {
	const page = req.query.page;
	const limit = req.query.limit;
	if (!page && !limit) {
		res.status(422);
		res.send({
			error: 'Invalid query, include page and limit in url path',
		});
	} else {
		next();
	}
};

module.exports = {
	isValidPagination,
};
