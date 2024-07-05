import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Shop } from 'src/shop/entities/shop.entity';
//import { Seller } from 'src/seller/entities/seller.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Schema()
export class OrderDetails {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product',  })
  product: Product;

  @Prop({  })
  quantity: number;

  @Prop({  })
  unitPrice: number;

  @Prop({  })
  subtotal: number;
}

@Schema()
export class Order extends Document {
  @Prop({  })
  nameOfReciever: string;

  @Prop({  })
  phoneNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  seller: User;

  @Prop({ type: Number, default: null })
  messangerPrice: number | null;

  @Prop({  })
  orderDate: Date;

  @Prop({  })
  orderStatus: string;

  @Prop({
    type: {
      street: String,
      betweenStreet1: String,
      betweenStreet2: String,
      buildingNumber: String,
      reference: String,
      additionalDetails: String,
    },
  })
  shippingAddress: {
    streets: string;
    reference: string;
    additionalDetails: string;
  };

  @Prop()
  hasDelievery: boolean;

  @Prop()
  estimatedDeliveryDate: Date;

  @Prop({  })
  totalCost: number;

  // Products
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: OrderDetails.name })
  orderDetails: OrderDetails[];
}

export const OrderModel = SchemaFactory.createForClass(Order);
