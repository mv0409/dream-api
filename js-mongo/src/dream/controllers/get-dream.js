const httpError = require("../../helpers/http-error")
const Dream = require("../schema/dream-schema")

const getDreamController = () => {
    return async(req) => {
        try {
            const dream = await Dream.findById(req.params.id)
            if(!dream) {
                throw new Error('no valid dream id')
            }
            return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
                data: dream,
			};
        } catch (error) {
            return httpError({
                statusCode: 422,
                errorMessage: error.message
            })
        }
    }
}

module.exports = {
    getDreamController
}