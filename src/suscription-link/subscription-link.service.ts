// subscription-link.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionLink } from './entities/suscription-link.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateShopDto } from 'src/shop/dto/create-shop.dto';
import {Types} from "mongoose"
@Injectable()
export class SubscriptionLinkService {
  constructor(
    @InjectModel(SubscriptionLink.name) private subscriptionLinkModel: Model<SubscriptionLink>,
  ) {}

  async createSubscriptionLink(): Promise<SubscriptionLink> {
    const subscriptionLink = new this.subscriptionLinkModel();
    return subscriptionLink.save();
  }

  async updateSubscriptionLinkOnShop(id: Types.ObjectId, updateShopDto: CreateShopDto): Promise<SubscriptionLink> {
    const updatedSubscriptionLink = await this.subscriptionLinkModel
      .findByIdAndUpdate(id, { shopId: updateShopDto._id }, { new: true })
      .exec();
    return updatedSubscriptionLink;
  }

  async updateSubscriptionLinkOnUser(id: string | Types.ObjectId, updateUserDto: CreateUserDto): Promise<SubscriptionLink> {
    const updatedSubscriptionLink = await this.subscriptionLinkModel
    .findByIdAndUpdate(id, { ownerId: updateUserDto._id }, { new: true })
    .exec();
    return updatedSubscriptionLink;
  }

  async updateSubscriptionLinkOnSellers(id: string | Types.ObjectId, updateUserDto: CreateUserDto): Promise<SubscriptionLink> {
    const updatedSubscriptionLink = await this.subscriptionLinkModel
      .findByIdAndUpdate(id, { $push: {
        sellersIds: updateUserDto._id 
      }
    }, { new: true })
    .exec();

    return updatedSubscriptionLink;
  }
  async getSubscriptionLinkById(id: string | Types.ObjectId): Promise<SubscriptionLink> {
    return this.subscriptionLinkModel.findById(id).exec();
  }

  async getSubscriptionLinkByStore(id: string | Types.ObjectId): Promise<SubscriptionLink> {
    return this.subscriptionLinkModel.findOne({ shopId: id }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.subscriptionLinkModel.findByIdAndDelete(id).exec();
  }
}
