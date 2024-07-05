import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';


import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Shop } from 'src/shop/entities/shop.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id)
    .exec();
  }

  async findProducts(filterData, pageIndex, pageSize, shop) {
    const { name, subcategory, status, query, sort } = filterData;

    // Construir la consulta
    let queryObject = {
      //shopId: shop._id, // Asumiendo que shop tiene una propiedad _id y es el identificador de la tienda
      _id: { $in: shop.productList }, // Buscar productos cuyos IDs estén en el array productIds
   };

    // Filtrar por nombre
    if (name) {
      queryObject['name'] = { $regex: name, $options: 'i' };
    }

    // Filtrar por categoría
    if (subcategory && subcategory.length > 0) {
      queryObject['subcategory'] = { $in: subcategory };
    }

    // Filtrar por estado
    if (status && status.length > 0) {
      queryObject['status'] = { $in: status };
    }

    // Filtrar por texto de búsqueda
    if (query) {
      queryObject['$or'] = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        // Agrega aquí otros campos que quieras buscar
      ];
    }

    // Ordenar los resultados
    const sortOptions = {};
    if (sort.order && sort.key) {
      sortOptions[sort.key] = sort.order === 'asc' ? 1 : -1;
    }

    // Aplicar paginación
    const skip = (pageIndex - 1) * pageSize;

    
    // Ejecutar la consulta
    const products = await this.productModel.find(queryObject)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .populate('subcategory')
      .exec();

    // Obtener el total de productos que coinciden con los filtros
    const total = await this.productModel.countDocuments(queryObject).exec();

    return {
      data: products,
      total,
    };
 }



  findAllByShopId(shopId: string) {
    return this.productModel.find({ shopId }).exec();
  }

  findAllByCategory(category: string, color: string, size: string, limit, skip) {
    return this.productModel.find({ category, color, size })
    .limit(limit)
    .skip(skip)
    .exec();
  }

  update(id: string, updateProductDto) {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }
  
  updateImageList(id: string, imgString: string) {
    return this.productModel
       .findByIdAndUpdate(id, { $push: { imgList: imgString } }, { new: true })
       .exec();
   }
  remove(id: string) {
    return this.productModel.findByIdAndRemove(id).exec();
  }
}
