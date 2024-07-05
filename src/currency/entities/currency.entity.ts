import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';

@Schema()
export class Currency extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  convertionRate: number;
}

export const CurrencyModel = SchemaFactory.createForClass(Currency);
