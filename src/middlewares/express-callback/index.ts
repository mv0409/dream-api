import { Request, Response } from 'express';

export default function expressCb(controller: any) {
	return (req: Request, res: Response) => {
		const httpRequest = {
			body: req.body,
			query: req.query,
			params: req.params,
			ip: req.ip,
			method: req.method,
			path: req.path,
			headers: {
				'Content-Type': req.get('Content-Type'),
				Referer: req.get('referer'),
				'User-Agent': req.get('User-Agent'),
			},
		};

		controller(httpRequest)
			.then(
				({
					headers,
					statusCode,
					payload
				}: {
					headers: any;
					statusCode: number;
					payload: any;
				}) => {
					res.status(statusCode)
						.set(headers)
						.send(payload);
				}
			)
			.catch((e: any) => {
				res.status(500).end();
				console.log(e);
			});
	};
}
