import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';
import {Model} from "mongoose";

@Injectable()
export class AttributeService {
  constructor(
    @InjectModel(Attribute.name)
    private readonly attributeModel: Model<Attribute>,
  ) {}
  create(createAttributeDto: CreateAttributeDto) {
    return 'This action adds a new attribute';
  }

  findAll() {
    return this.attributeModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} attribute`;
  }

  update(id: number, updateAttributeDto: UpdateAttributeDto) {
    return `This action updates a #${id} attribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}
