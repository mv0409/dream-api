const httpError = ({ statusCode, errorMessage }) => {
	return {
		headers: {
			'Content-Type': 'application/json',
		},
		statusCode,
		data: {
			success: false,
			message: errorMessage,
		},
	};
};
module.exports = httpError;
