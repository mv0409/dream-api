const { possibleTypes } = require('../schema/dream-schema');

const createDreamDto = (req, res, next) => {
	const title = req.body.title;
	const description = req.body.description;
	const type = req.body.type;
	const date = req.body.date;

	if (!title || !description || !type || !date) {
		res.status(422);
		res.send({
			error: 'Please include',
		});
	}

	// if(!/^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/.test(date)) {
	//     res.status(422)
	//     res.send({
	//         error: "Invalid date format"
	//     })
	// }

	if (!possibleTypes.includes(type)) {
		res.status(422);
		res.send({
			error: `Dream types must be ${possibleTypes}`,
		});
	}

	next();
};

module.exports = {
	createDreamDto,
};
