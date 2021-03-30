import { Request, Response } from 'express';
import { ControllerInterface } from '../../helpers/interfaces/controller.interface';
import { HttpResponse } from '../../helpers/interfaces/http-response';
import logging from '../../helpers/log/logging';

export default function expressCb(controller: ControllerInterface) {
	return (req: Request, res: Response): void => {
		logging.info(
			'SERVER',
			`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${req.statusCode}]- IP: [${req.socket.remoteAddress}] `,
		);
		controller(req)
			.then(
				({
					headers,
					statusCode,
					payload,
				}: HttpResponse) => {
					res.status(statusCode)
						.set(headers)
						.send(payload)
						.on('finish', () => {
							logging.info(
								'SERVER',
								`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
							);
						});
				},
			)
			.catch((error: Error) => {
				res.status(500).end();
				logging.error('SERVER', error.message, error);
			});
	};
}
