import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
//import { Variation } from 'src/variation/entities/variation.entity';
import { Category } from 'src/category/entities/category.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { type } from 'os';
@Schema()
export class PricingDetails {
  @Prop({ required: true })
  normalPrice: number;

  @Prop({ required: true })
  salePrice: number;

  @Prop({ default: 'CUP', enum: ["CUP", "USD", "EURO"] })
  referenceCurrency: string;

  @Prop()
  commission: number;

  @Prop()
  cost: number;

  @Prop()
  earnedPercentageOfProfit: number;
}

export enum GenderType {
  Masculino = 'masculino',
  Femenino = 'femenino',
  Unisex = 'unisex',
}


@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: PricingDetails })
  pricingDetails: PricingDetails;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: String, enum: GenderType, required: true })
  gender: GenderType;

  @Prop({ type: String })
  brand: string;

  /* @Prop({ type: [{type: MongooseSchema.Types.ObjectId}], ref: 'Variation' })
  variations: Variation[]; */

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category'})
  category: Category;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Subcategory.name })
  subcategory: Subcategory;

  @Prop({
    type: String,
    enum: ['En Inventario', 'En Camino', 'Agotado'],
    default: 'En Inventario',
  })
  status: string;

  @Prop({ type: Boolean, default: true })
  isVisible: boolean;

  @Prop({ type: String })
  img: string;

  @Prop({ type: [String] })
  imgList?: string[]
}

export const ProductModel = SchemaFactory.createForClass(Product);
