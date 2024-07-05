import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategoryModel } from './entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategoryModel }
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]

})
export class CategoryModule {}
