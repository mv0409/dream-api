import mongoose from 'mongoose';

export const possibleTypes = ['happy', 'sad', 'exciting', 'scary'];

interface DreamDoc extends mongoose.Document {
	title: string;
	description: string;
	date: string;
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
			type: String,
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

export const Dream = mongoose.model<DreamDoc>('Dream', dreamSchema);
