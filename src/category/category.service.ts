import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import {Model} from "mongoose"
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    ){}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return this.categoryModel.find();
  }

  findOne(id: any) {
    return this.categoryModel.findById(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  updateSub(id: any, subcategoryId) {
    return this.categoryModel
    .findByIdAndUpdate(id, { $push: { subcategories: subcategoryId } }, { new: true })
    .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
