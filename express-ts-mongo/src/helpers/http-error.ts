import { HttpResponse } from '../middlewares/express-callback';

export const makeHttpError = ({
	statusCode,
	errorMessage,
}: {
	statusCode: number;
	errorMessage: string;
}): HttpResponse => {
	return {
		headers: {
			'Content-Type': 'application/json',
		},
		statusCode,
		payload: {
			success: false,
			error: errorMessage,
		},
	};
};
