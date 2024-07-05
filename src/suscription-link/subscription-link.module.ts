import { Module } from '@nestjs/common';
import { SubscriptionLinkService } from './subscription-link.service';
import { SubscriptionLinkController } from './subscription-link.controller';
import { SubscriptionLink, SubscriptionLinkSchema } from './entities/suscription-link.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Shop, ShopSchema } from 'src/shop/entities/shop.entity';
import { UserService } from 'src/user/user.service';
import { ShopService } from 'src/shop/shop.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    
    MongooseModule.forFeature([{ name:  User.name, schema: UserSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: SubscriptionLink.name, schema: SubscriptionLinkSchema }]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({secret: 'W*11*4m16'}),
  ],
  providers: [ SubscriptionLinkService, ShopService, UserService, JwtService ],
  controllers: [SubscriptionLinkController],
})
export class SubscriptionLinkModule {}