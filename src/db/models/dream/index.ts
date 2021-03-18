import mongoose from 'mongoose';

interface DreamAttr {
	title: string;
	description: string;
	date: Date;
	type: Enumerator;
}

export const possibleTypes = ['happy', 'sad', 'exciting', 'scary']

interface DreamModel extends mongoose.Model<DreamDoc> {
	build(attr: DreamAttr): DreamDoc;
}

interface DreamDoc extends mongoose.Document {
	title: string;
	description: string;
	date: Date;
	type: Enumerator;
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
			enum: possibleTypes,
			required: true,
		},
	},
	{
		collection: 'dream',
		timestamps: true,
	},
);


export const Dream = mongoose.model<DreamDoc, DreamModel>('Dream', dreamSchema);
