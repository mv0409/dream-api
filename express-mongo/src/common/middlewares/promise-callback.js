'use strict';

const handleError = require('../utils/handle-error');
const handleResponse = require('../utils/handle-response');
const logger = require('../utils/logger');

const callback = (controller) => {
	return (req, res) => {
		logger.info(
			'SERVER',
			`METHOD: [${req.method}] - ` +
				`URL: [${req.url}] - ` +
				`STATUS: [${req.statusCode}]- ` +
				`IP: [${req.socket.remoteAddress}] `,
		);
		controller(req, res)
			.then((data) => {
				handleResponse(res, data);
				logger.info(
					'SERVER',
					`METHOD: [${req.method}] - ` +
						`URL: [${req.url}] - ` +
						`STATUS: [${res.statusCode}] - ` +
						`IP: [${req.socket.remoteAddress}] `,
				);
			})
			.catch((err) => {
				handleError(res, err);
			});
	};
};

module.exports = callback;
