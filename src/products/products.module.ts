import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductModel } from './entities/product.entity';
import { ShopModule } from 'src/shop/shop.module';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { Category, CategoryModel } from 'src/category/entities/category.entity';
import { Subcategory, SubcategoryModel } from 'src/subcategory/entities/subcategory.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { Shop, ShopSchema } from 'src/shop/entities/shop.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductModel },
      { name: Category.name, schema: CategoryModel },
      { name: Subcategory.name, schema: SubcategoryModel },
    ]),
    ShopModule,
    UserModule,
    CategoryModule,
    SubcategoryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({secret: 'W*11*4m16'}),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CategoryService, SubcategoryService],
  exports: [ProductsService]
})
export class ProductsModule {}
