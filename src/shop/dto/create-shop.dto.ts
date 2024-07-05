// create-shop.dto.ts

import { IsString, IsOptional, IsMongoId } from 'class-validator';
import {Types} from "mongoose"
export class CreateShopDto {
  @IsString()
  @IsOptional()
  storeName: string;

  @IsString()
  @IsOptional()
  township?: string;

  @IsMongoId()
  ownerId: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  _id?: Types.ObjectId; // MongoDB ObjectId for the shop
}
