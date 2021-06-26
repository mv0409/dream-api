import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DreamDocument = Dream & Document;
export const dreamType = ['happy', 'sad', 'exciting', 'scary'];

@Schema()
export class Dream {
	@Prop({ required: true, enum: dreamType })
	type: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	date: Date;
}

export const DreamSchema = SchemaFactory.createForClass(Dream);
