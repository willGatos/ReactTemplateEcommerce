import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subcategory, SubcategoryModel } from './entities/subcategory.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
    { name: Subcategory.name, schema: SubcategoryModel},
  ])],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
  exports: [SubcategoryService]
})
export class SubcategoryModule {}
