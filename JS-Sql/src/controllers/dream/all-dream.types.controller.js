import { Dream } from '../../../database/models';
import HttpError from '../../helpers/errors/http-error';

export default function AllDreamTypesController() {
	return async () => {
		try {
			const result = await Dream.rawAttributes.states.values;
			// console.log(Dream.)
			// const result = await Dream.find();

			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 200,
				data: {
					success: true,
					payload: result,
				},
			};
		} catch (error) {
			return HttpError({
				statusCode: 500,
				errorMessage: error.message,
			});
		}
	};
}
