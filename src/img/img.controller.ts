import { ImgService } from './img.service';
import { CreateImgDto } from './dto/create-img.dto';
import { UpdateImgDto } from './dto/update-img.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors, UploadedFile, Res
} from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ShopService } from 'src/shop/shop.service';
import fileValidation from 'src/helper/fileValidation';
import { ProductsService } from 'src/products/products.service';

@Controller('upload')
export class ImgController {
  constructor(
    private readonly imgService: ImgService,
    private readonly shopService: ShopService,
    private readonly productService: ProductsService,
    
    ) {}

  @Post('/shopIcon')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAdminFile(@UploadedFile() file: Express.Multer.File, @Body('shopId') shopId: string, @Res() response) 
  {
    fileValidation(file, response)
    try {
      const uploadedFileName = await this.imgService.saveImage(file.buffer, file.mimetype, 120);
      await this.shopService.update(shopId, {storeLogo: uploadedFileName})
      return response.json({ message: 'Archivo Cargado', fileName: uploadedFileName });
    } catch (error) {
      return response.status(500).json({ message: 'Failed to save image', error: error.message });
    }
  }

  @Post('/productImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductFile(@UploadedFile() file: Express.Multer.File, @Body('shopId') productId: string, @Res() response) 
  {
    fileValidation(file, response);
    try {
      const uploadedFileName = await this.imgService.saveImage(file.buffer, file.mimetype, 200);
      console.log("first", uploadedFileName);
      return response.json({ message: 'Archivo Cargado', fileName: uploadedFileName });
    } catch (error) {
      return response.status(500).json({ message: 'Failed to save image', error: error.message });
    }
  }
}
