import { Module } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopModule } from 'src/shop/shop.module';
import { ShopService } from 'src/shop/shop.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ShopModule, ProductsModule],
  controllers: [ImgController],
  providers: [ImgService],
  exports: [ImgService]
})
export class ImgModule {}
