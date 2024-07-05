import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { Schema as MongooseSchema } from 'mongoose';
@Schema()
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{type: MongooseSchema.Types.ObjectId, ref: Subcategory.name}]})
  subcategories: Subcategory[];
}

export const CategoryModel = SchemaFactory.createForClass(Category);


  /* @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Attribute.name })
  attributes: Attribute[]; */