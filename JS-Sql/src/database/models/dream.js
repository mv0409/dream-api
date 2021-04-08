'use strict';
const { Model, DataTypes, Op } = require('sequelize');
const sequelize = require('../connection');

module.exports = () => {
	class Dream extends Model {}
	Dream.init(
		{
			title: {
				type: DataTypes.STRING,
				require: true,
			},
			description: {
				type: DataTypes.STRING,
				require: true,
			},
			date: {
				type: DataTypes.DATE,
				require: true,
			},
			type: {
				type: DataTypes.ENUM,
				values: ['sad', 'happy', 'exciting', 'scary'],
				require: true,
			},
		},
		{
			sequelize,
			modelName: 'Dream',
		},
	);

	Dream.transformSearch = (req) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const type = req.query.type;
		const title = req.query.title;
		const offset = (page - 1) * limit;

		if (!page || !limit) {
			throw new Error(
				'Invalid query, include page and limit in url path',
			);
		}

		const query = {};
		if (type) query.type = type;
		if (title) query.title = title;

		if (req.query.startDate && req.query.endDate) {
			const startDate = new Date(
				req.query.startDate,
			);
			const endDate = new Date(req.query.endDate);
			query.date = {
				[Op.between]: [startDate, endDate]
			}
		}

		return {
			where: query,
			offset,
			limit,
		};
	};

	return Dream;
};
