// subscription-link.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Shop } from 'src/shop/entities/shop.entity';

@Schema()
export class SubscriptionLink extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User'})
  ownerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Shop'})
  shopId: Shop;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  sellersIds: User[];

  @Prop({ type: Date, required: true, default: () => Date.now() + 60 * 60 * 1000 })
  expDate: Date;
}

export const SubscriptionLinkSchema = SchemaFactory.createForClass(SubscriptionLink);
