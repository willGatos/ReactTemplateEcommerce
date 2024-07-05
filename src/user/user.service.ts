import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './entities/user.entity';
import { CreateUserDto, signInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Types} from "mongoose"
import { JwtService } from '@nestjs/jwt';
import { ShopService } from 'src/shop/shop.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private shopService: ShopService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }


  async validateUserAndGetShop(req){
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
    try {
    const decoded = this.jwtService.verify(token, {secret: "W*11*4m16"});
    const user = await this.findOneByEmail(decoded.email);
    const shopValidation = await this.shopService.findOneByUser(user._id);

    return { user , shopValidation }
    } 
    catch (err) { console.error('JWT verification error', err) }
    }
  }

  async getToken(signInDto){  
    const payload = { 
      email: signInDto.email, 
      shop: signInDto.shop._id.toString()
    };
    console.log("first5", payload);
    try{
      const token = await this.jwtService.sign(payload, {secret: "W*11*4m16"});
      return token;
    }
    catch (error){
      return { error , status: "failed" }
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({email}).exec();
  }

  findById(id: string |Types.ObjectId ) {
    return this.userModel.findById(id).exec();
  }
  update(id: string | Types.ObjectId, updateShopDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateShopDto, { new: true })
      .exec();
  }
}
