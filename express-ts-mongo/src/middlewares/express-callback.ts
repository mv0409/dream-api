import { Request, Response } from 'express';
// import { ControllerInterface } from '../../helpers/interfaces/controller.interface';
// import { HttpResponse } from '../../helpers/interfaces/http-response';
import logger from '../helpers/logger';

interface IController {
	(req: Request): Promise<HttpResponse>;
}

export interface HttpResponse {
	headers: any;
	statusCode: number;
	payload?: {
		success?: boolean;
		error?: string;
		data?: any;
		message?: string;
		count?: number;
	};
	cookie?: string;
	clearCookie?: string;
}

export const cb = (controller: IController) => {
	return (req: Request, res: Response): void => {
		logger.info(
			'SERVER',
			`METHOD: [${req.method}] - ` +
				`URL: [${req.url}] - ` +
				`STATUS: [${req.statusCode}]- ` +
				`IP: [${req.socket.remoteAddress}] `,
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
							logger.info(
								'SERVER',
								`METHOD: [${req.method}] - ` +
									`URL: [${req.url}] - ` +
									`STATUS: [${res.statusCode}] - ` +
									`IP: [${req.socket.remoteAddress}] `,
							);
						});
				},
			)
			.catch((error: Error) => {
				res.status(500).end();
				logger.error('SERVER', error.message, error);
			});
	};
};
