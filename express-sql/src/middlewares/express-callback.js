const logger = require('../helpers/logger');

const cb = (controller) => {
	return (req, res) => {
		logger.info(
			'SERVER',
			`METHOD: [${req.method}] - ` +
				`URL: [${req.url}] - ` +
				`STATUS: [${req.statusCode}]- ` +
				`IP: [${req.socket.remoteAddress}] `,
		);
		controller(req)
			.then(({ statusCode, headers, data }) => {
				res.status(statusCode);
				res.set(headers);
				res.send(data);
				res.on('finish', () => {
					logger.info(
						'SERVER',
						`METHOD: [${req.method}] - ` +
							`URL: [${req.url}] - ` +
							`STATUS: [${res.statusCode}] - ` +
							`IP: [${req.socket.remoteAddress}] `,
					);
				});
			})
			.catch((error) => {
				logger.error('SERVER', error.message, error);
				res.status(500).end();
			});
	};
};

module.exports = {
	cb,
};
