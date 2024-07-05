import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types,Schema as MongooseSchema } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Order } from 'src/order/entities/order.entity';
import { Shop } from 'src/shop/entities/shop.entity';

enum PermissionType {
  
}
@Schema()
export class Config{
  @Prop({ type: String })
  themeColor: string;

  @Prop({ type: String })
  direction: string;

  @Prop({ type: String })
  mode: string;

  @Prop({ type: Number })
  primaryColorLevel: number;

  @Prop({ type: Boolean })
  cardBordered: boolean;

  @Prop({ type: Boolean })
  panelExpand: boolean;

  @Prop({ type: String })
  controlSize: string;

  @Prop({ type: String })
  navMode: string;

  @Prop({
    type: {
      type: String,
      sideNavCollapse: Boolean,
    },
    default: {},
  })
  layout: {
    type: string;
    sideNavCollapse: boolean;
  };


}

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ type: String, default: "", unique: false })
  telegramId: string;

  @Prop({ unique: true })
  phone: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({type: Config})
  customizationSettings: Config
  
  @Prop({ 
    type: [String], 
    enum: ['inventario','estadisticas','gestores','mensajeria'], 
    default: []
  })
  permissions: [string];

  @Prop({ enum: ['client', 'seller', 'owner', 'admin'], default: 'seller' })
  roles: string;

  @Prop({ type: Types.ObjectId, ref: 'Shop' })
  shop: Shop | Types.ObjectId;

  @Prop({ type: [{type : MongooseSchema.Types.ObjectId, ref: Order.name}], default: [] })
  ordersMade: Order[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Client' }] })
  clients: Client[];  

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
