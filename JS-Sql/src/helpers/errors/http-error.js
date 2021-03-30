const HttpError = ({ statusCode, errorMessage }) => {
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
export default HttpError;
