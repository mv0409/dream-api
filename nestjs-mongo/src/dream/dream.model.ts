import * as mongoose from 'mongoose';

export interface Dream {
	title: string;
	description: string;
	date: Date;
	type: string;
}

export const DreamType = ['happy', 'sad', 'exciting', 'scary'];

export interface DreamDoc extends mongoose.Document {
	title: string;
	description: string;
	date: Date;
	type: string;
}

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
			enum: DreamType,
			required: true,
		},
	},
	{
		collection: 'dream',
		timestamps: true,
	},
);
export const Dream = {
	name: 'Dream',
	schema: dreamSchema,
};
