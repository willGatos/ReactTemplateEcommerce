import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { ClientModule } from './client/client.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { AttributeModule } from './attribute/attribute.module';
//import { subscriptionPaymentModule } from './suscription-payment/suscription-payment.module';
import { CurrencyModule } from './currency/currency.module';
import {SubscriptionLinkModule} from "./suscription-link/subscription-link.module"
import { ImgModule } from './img/img.module';

const uri =
'mongodb://127.0.0.1:27017/suxces-ecommerce';
//'mongodb+srv://suxcesagency:4CfGznLEYzgjl2IA@cluster0.pkdazcn.mongodb.net/?retryWrites=true&w=majority'; 
@Module({
  imports: [
    MongooseModule.forRoot(
      uri,
      //'mongodb+srv://Will1:12345678Will@cluster0.hahinft.mongodb.net/?retryWrites=true&w=majority',
    ),
    /* MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        tls: {
          rejectUnauthorized: false, //ziudfcsjfgdhekqi-Wil2022@
        },
        secure: true,
        auth: {
          user: 'perxins@gmail.com',
          pass: 'ziudfcsjfgdhekqi',
        },
      },
      defaults: {
        from: 'Perxins',
      },
    }), */
    //ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    ShopModule,
    UserModule,
    OrderModule,
    CategoryModule,
    ClientModule,
    SubcategoryModule,
    AttributeModule,
    //subscriptionPaymentModule,
    CurrencyModule,
    SubscriptionLinkModule,
    ImgModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
//UploadModule
