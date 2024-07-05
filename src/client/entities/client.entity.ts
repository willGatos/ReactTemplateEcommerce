import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';

@Schema()
export class Client extends Document {
  
}

export const ClientModel = SchemaFactory.createForClass(Client);
