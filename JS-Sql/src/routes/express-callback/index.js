import logging from '../../helpers/logger';

export default function cb(controller) {
	return (req, res) => {
		logging.info(
			'SERVER',
			`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${req.statusCode}]- IP: [${req.socket.remoteAddress}] `,
		);
		controller(req)
			.then(({ statusCode, headers, data }) => {
				res.status(statusCode);
				res.set(headers);
				res.send(data);
				res.on('finish', () => {
					logging.info(
						'SERVER',
						`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
					);
				});
			})
			.catch((error) => {
				logging.error('SERVER', error.message, error);
				res.status(500).end();
			});
	};
}
