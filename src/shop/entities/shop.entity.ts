import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types} from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
//import { SubscriptionPayment } from 'src/suscription-payment/entities/suscription-payment.entity';
import { Currency } from 'src/currency/entities/currency.entity';
//import { Expense } from 'src/expenses/entities/expense.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

@Schema()
export class Shop extends Document {
  @Prop()
  storeName: string;
  
  @Prop()
  storeLogo: string; 

  @Prop({ unique: true })
  identifier: string;

  @Prop({ type: String, default: ""})
  messagerPricingList: string;

  @Prop()
  address: string;

  @Prop()
  township: string;
  
  @Prop({ type: Number })
  availableMoney: number;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: MongooseSchema.ObjectId, required: true })
  ownerId: MongooseSchema.Types.ObjectId; // ID of the user who owns the shop

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Category' }] })
  productCategories: MongooseSchema.Types.ObjectId[];
  
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Attribute' }] })
  productAttributes: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Subcategory.name }] })
  productSubcategories: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Order' }] })
  ordersHistory: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: User.name }] })
  employees: MongooseSchema.Types.ObjectId[];

  /* @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Expense.name }] })
  expenses: MongooseSchema.Types.ObjectId[]; */

  @Prop({
    type: [{ type: Types.ObjectId, ref: User.name }],
  })
  sellers: Types.Array<User>;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Product.name }],
  })
  productList: Product[];

  
  /* @Prop({
    type: [{ type: Types.ObjectId, ref: SubscriptionPayment.name }],
  })
  SubscriptionPaymentHistory: MongooseSchema.Types.ObjectId[]; */

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Shop' }] })
  relatedShops: Shop[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);