const httpError = require("../../helpers/http-error")
const Dream = require("../schema/dream-schema")

const deleteDreamController = () => {
    return async( req ) => {
        try {
            const removed = await Dream.findByIdAndDelete(req.params.id)
            if(!removed) {
                return httpError({
					statusCode: 422,
					errorMessage: 'Invalid dream id',
                })
            }
            return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
                data: removed,
			};
        } catch (error) {
            return httpError({
                statusCode: 422,
                errorMessage: error.message
            })
        }
    }
}

module.exports = {deleteDreamController}