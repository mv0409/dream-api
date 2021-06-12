const Dream = require("../database/models/Dream");

const validDreamType = (req, res, next) => {
	const possibleTypes = Dream().rawAttributes.type.values
	const type = req.params.type;
	if (!type) {
		next();
	}
	if (!possibleTypes.includes(type)) {
		res.status(422);
		res.send({
			error: `type must be one of possible types / (${possibleTypes})`,
		});
	} else {
		next();
	}
};

module.exports = {
	validDreamType,
};
