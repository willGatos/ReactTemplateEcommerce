import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateImgDto } from './dto/create-img.dto';
import { UpdateImgDto } from './dto/update-img.dto';
import {Model} from "mongoose";
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class ImgService {
  constructor() {
    
  }
  create(createImgDto: CreateImgDto) {
    return 'This action adds a new img';
  }

  async saveImage(imageBuffer: any, filetype: string, resized) {
    const publicPath = 'uploads/';
    if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath);
    const uniqueId = uuidv4();
    const fileType = filetype.split('/')[1];
    const fileName = `${uniqueId}.${fileType}`;
    const filePath = `${publicPath}${fileName}`;
  
    try {
      fs.writeFileSync(filePath, imageBuffer);
      await sharp(imageBuffer)
        .resize(resized)
        .toFile(`${publicPath}thn-${fileName}`);
      // Actualizar el logo de la tienda en la base de datos
      //await this.shopModel.findByIdAndUpdate(shopId, { logo: fileName });
      return fileName;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to save image');
    }
  }

  findAll() {
    return `This action returns all img`;
  }

  findOne(id: number) {
    return `This action returns a #${id} img`;
  }

  update(id: number, updateImgDto: UpdateImgDto) {
    return `This action updates a #${id} img`;
  }

  remove(id: number) {
    return `This action removes a #${id} img`;
  }
}
