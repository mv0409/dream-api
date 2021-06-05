const httpError = require("../../helpers/http-error");
const Dream = require("../schema/dream-schema")

const createDreamController = () => {
    return async(req) => {
        try {
            const dream = await Dream.create(req.body)
            return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 201,
				data: dream,
			};
        } catch (error) {
            return httpError({
				statusCode: 422,
				errorMessage: error.message,
            })
        }
    }
}

module.exports = {createDreamController}