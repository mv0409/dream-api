'use strict';

const mongoose = require('mongoose');

const possibleTypes = ['happy', 'sad', 'exciting', 'scary'];

const dreamSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		type: {
			type: String,
			enum: possibleTypes,
			required: true,
		},
	},
	{
		collection: 'dream',
		timestamps: true,
	},
);

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = {
	possibleTypes,
	Dream,
};
