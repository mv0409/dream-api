'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Dreams', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				require: true,
			},
			description: {
				type: Sequelize.STRING,
				require: true,
			},
			date: {
				type: Sequelize.DATE,
				require: true,
			},
			type: {
				type: Sequelize.ENUM,
				values: ['sad', 'happy', 'exciting', 'scary'],
				require: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Dreams');
	},
};
