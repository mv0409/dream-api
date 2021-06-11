class CustomError extends Error {
	constructor(statusCode, errorMessage) {
		super();
		this.statusCode = statusCode;
		this.message = errorMessage;
	}
}

module.exports = { CustomError };
