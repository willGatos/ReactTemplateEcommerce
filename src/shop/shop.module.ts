import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { Shop, ShopSchema } from './entities/shop.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { ImgService } from 'src/img/img.service';
import { ImgModule } from 'src/img/img.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shop.name, schema: ShopSchema },
    ]),
    UserModule,
    JwtModule.register({secret: 'W*11*4m16'}),
  ],
  controllers: [ShopController],
  providers: [ShopService, ImgService],
  exports: [ShopService],
})
export class ShopModule {}
