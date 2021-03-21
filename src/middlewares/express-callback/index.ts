import { Request, Response } from 'express';
import { ControllerInterface } from '../../helpers/interfaces/controller.interface';
import { HttpResponse } from '../../helpers/interfaces/http-response';

export default function expressCb(controller: ControllerInterface) {
	return (req: Request, res: Response): void => {
		const httpRequest: Request = req;

		controller(httpRequest)
			.then(
				({
					headers,
					statusCode,
					payload,
				}: HttpResponse) => {
					res.status(statusCode)
						.set(headers)
						.send(payload);
				},
			)
			.catch((e: Error) => {
				res.status(500).end();
				console.log(e);
			});
	};
}
