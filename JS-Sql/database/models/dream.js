'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
	return Dream;
};