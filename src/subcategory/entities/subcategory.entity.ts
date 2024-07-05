import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subcategory extends Document {
  @Prop({ required: true })
  name: string;
}

export const SubcategoryModel = SchemaFactory.createForClass(Subcategory);
