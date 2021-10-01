import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type DreamDocument = Dream & Document

@Schema({timestamps: true}) 
export class Dream {
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    date: Date

    @Prop()
    type: string
}

export const DreamSchema = SchemaFactory.createForClass(Dream)