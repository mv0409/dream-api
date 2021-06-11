const { possibleTypes } = require("../dream/schema/dream-schema");

const validDreamType = (req, res, next) => {
    const type = req.params.type
    if(!type) {
        next()
    }
    if(!possibleTypes.includes(type)) {        
		res.status(422);
		res.send({
			error: `type must be one of possible types / (${possibleTypes})` ,
		});
	} else {
		next();
	}
}

module.exports = {
    validDreamType
}