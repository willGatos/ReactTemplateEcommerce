// subscription-link.controller.ts

import { Controller, Post, Put, Get, Delete, Param, Body, HttpException, HttpStatus, Req } from '@nestjs/common';
import { SubscriptionLinkService } from './subscription-link.service';
import { CreateUserDto, signInDto} from 'src/user/dto/create-user.dto';
import { CreateShopDto } from 'src/shop/dto/create-shop.dto';
import { UserService } from 'src/user/user.service';
import { ShopService } from 'src/shop/shop.service';
import { SubscriptionLink } from './entities/suscription-link.entity';
import {Types} from "mongoose"

@Controller('subscription-links')
export class SubscriptionLinkController {
  constructor(
    private readonly subscriptionLinkService: SubscriptionLinkService,
    private readonly userService: UserService,
    private readonly shopService: ShopService,
  ) {}

  @Post()
  async createSubscriptionLink(): Promise<SubscriptionLink> {
    return this.subscriptionLinkService.createSubscriptionLink()
  }

  @Put(':id/user')
  async updateUser(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    try {
      const subs = await this.subscriptionLinkService.getSubscriptionLinkById(id)
      if(subs.ownerId)
      {
        createUserDto.permissions = ['inventario','estadisticas','gestores','mensajeria'];
        createUserDto.roles = ["owner"]
        const newUser = await this.userService.create(createUserDto);
        await this.subscriptionLinkService.updateSubscriptionLinkOnUser(
            id, newUser._id
        );
        const token = await this.userService.getToken(createUserDto)
        return {user:newUser, status: "success", token};
      } 
      else{
        throw new HttpException(
          'Usuario ya Creado.', 
          HttpStatus.UNAUTHORIZED
        );
      } 
    
    }
    catch (error){
        return { error , status: "failed" }
    }
  }

  @Put('/sign-up/:id/seller')
  async createSellerAndAddToStore(
    @Param('id') id: string, 
    @Body() createUserDto: CreateUserDto) {
  try {
      createUserDto.roles = ["seller"]

      const newUser = await this.userService.create(createUserDto);
      const subLink = await this.subscriptionLinkService.updateSubscriptionLinkOnSellers( id, newUser._id );
      
      const shop = await this.shopService.updateSellers(subLink.shopId, newUser)


      const updateShopDto = {
        storeName: "Tienda de" + newUser.name,
        phone :createUserDto.phone,
        identifier: createUserDto.identifier,
        email :createUserDto.email,
        ownerId : newUser._id,
        relatedShops: [shop._id],
      }

      const newShop = await this.shopService.create(updateShopDto);
      newUser.shop = newShop;
      newUser.save();

      const token = await this.userService.getToken(newUser)

      return {
        user: newUser, 
        status: "success", 
        token, 
  //      subscriptionLink : newSub._id,
      };
  }
  catch (error){
      return { error , status: "failed" }
  }
}


  @Put('/sign-in/:id/seller')
  async addSellerToStore(
    @Param('id') id: string, 
    @Body() signedUserDto: signInDto
    ) {

    try {
      const userEmail = { email: signedUserDto.email };

      const foundedUser = await this.userService.findOneByEmail(userEmail.email);

      if (foundedUser) {
        if(foundedUser.password == signedUserDto.password){
          const token = await this.userService.getToken(foundedUser)

          const subLink = await this.subscriptionLinkService.updateSubscriptionLinkOnSellers(id, foundedUser._id);
          
          await this.shopService.updateSellers(subLink.shopId, foundedUser)
          await this.shopService.updateRelatedShops(subLink.shopId, foundedUser.shop)

          return { 
            user: foundedUser, 
            status: "success", 
            token
          };
        }
      }
      throw new HttpException('Contraseña o Email Incorrecto', HttpStatus.UNAUTHORIZED);
    } 
    catch (error) {
      console.error(error);
      throw new HttpException('Contraseña o Email Incorrecto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@Put(':id/shop')
  async updateShop(
    @Param('id') id: Types.ObjectId, 
    @Body() updateShopDto: CreateShopDto): 
    Promise<CreateShopDto> 
    {
    console.log(updateShopDto);
    const subscriptionLink = await this.subscriptionLinkService.getSubscriptionLinkById(id)

    updateShopDto.ownerId = subscriptionLink.ownerId
    
    const newShop = await this.shopService.create(updateShopDto);
    const user = await this.userService.findById(subscriptionLink.ownerId)
    user.shop = newShop;
    user.save();

    await this.subscriptionLinkService.updateSubscriptionLinkOnShop(id, newShop._id);
    return; 
  }

  @Get()
  async getSubscriptionLinkById(@Req() req){
    const {shopValidation, user} = await this.userService.validateUserAndGetShop(req);
    
    const d = await this.subscriptionLinkService.getSubscriptionLinkByStore(shopValidation._id);
    console.log(d)
    console.log(user, shopValidation);

    return d
  }

  @Delete(':id')
  async deleteSubscriptionLink(@Param('id') id: string): Promise<void> {
    return this.subscriptionLinkService.delete(id);
  }
}
