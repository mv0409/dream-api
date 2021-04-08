'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

module.exports = () => {
	class Dream extends Model {
		static associate(models) {}
	}
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
		const queryStartDate = req.query.startDate;
		const queryEndDate = req.query.endDate;
		const startIndex = (page - 1) * limit;

		if (!page || !limit) {
			throw new Error('Invalid Query, include page and limit')
		}

		if (queryEndDate && queryStartDate) {
			const startDate = new Date(queryStartDate.toString());
			const endDate = new Date(queryEndDate.toString());
			return {
				from: {
					$between: [startDate, endDate],
				},
				where: req.body,
				offset: startIndex,
				limit: limit,
			};
		}

		return {
			where: req.body,
			offset: startIndex,
			limit: limit,
		};
	};

	return Dream;
};
