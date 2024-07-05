
// attribute/attribute.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Attribute {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop({ type: [String] }) // Now it's an array of strings
  options: string[];
}

export const AttributeModel = SchemaFactory.createForClass(Attribute);