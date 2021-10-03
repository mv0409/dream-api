import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DreamDocument = Dream & Document;

@Schema({ timestamps: true })
export class Dream {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  date: Date;
}

export const DreamSchema = SchemaFactory.createForClass(Dream);
