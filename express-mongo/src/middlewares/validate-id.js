const mongoose = require('mongoose');

const isValidId = (req, res, next) => {
	const objectId = mongoose.isValidObjectId(req.params.id);
	if (!objectId) {
		res.status(422);
		res.send({
			error: 'Not valid id format',
		});
	} else {
		next();
	}
};

module.exports = {
	isValidId,
};
