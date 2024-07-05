import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';


@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name) private readonly shopModel: Model<Shop>) {}

  create(createShopDto: CreateShopDto) {
    const shop = new this.shopModel(createShopDto);
    return shop.save();
  }

  findAll() {
    return this.shopModel.find().exec();
  }

  findByIdWithProducts(id: string) {
    return this.shopModel.findById(id).populate('productsList').exec();
  }

  async findOne(id: string) {
    const shop = await this.shopModel.findOne({ id }).exec();
    return { exists: shop != null, shop};
  }
  async findOneByUser(id: any) {
    const shop = await this.shopModel.findOne({ ownerId: id }).exec();
    return shop;
  }
  async findOnePhone(phone: string) {
    const model = await this.shopModel.findOne({ phone }).exec();
    console.log(model, model != null);
    return { exists: model != null };
  }
  async findProductsFromAllShops(shopId) {
  
    // Ejecutar la consulta
    const allShopsRelated = await this.shopModel.findById(shopId)
      .populate({
        path: 'relatedShops',
        populate: {
          path: 'productList',
          select: "_id name pricingDetails status"
        },
      })
      .exec();
      const productsLists = allShopsRelated.relatedShops.map(({productList}) =>{
        return productList
      })
      let products = []
      productsLists.forEach(productList => {
        products.push(...productList)
      })
      console.log(allShopsRelated,products)
    // Obtener el total de productos que coinciden con los filtros
    return products;
  }

  update(id: string, updateShopDto) {
    return this.shopModel
      .findByIdAndUpdate(id, updateShopDto, { new: true })
      .exec();
  }

  updateSellers(id, shopSeller) {
    return this.shopModel
      .findByIdAndUpdate(id, {
        $push: { sellers: shopSeller }
      }, 
        { new: true })
      .exec();
  }

  updateRelatedShops(id, shop) {
    return this.shopModel
      .findByIdAndUpdate(id, {
        $push: { relatedShops: shop }
      }, 
        { new: true })
      .exec();
  }

  remove(id: string) {
    return this.shopModel.findByIdAndRemove(id).exec();
  }
}
