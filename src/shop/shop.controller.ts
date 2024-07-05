import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UserService } from 'src/user/user.service';
import bot from 'src/helper/telegramBot';
//import validateUserAndGetShop from 'src/helper/validateUserAndGetShop';
import { JwtService } from '@nestjs/jwt';
//https://t.me/+hwpqoFNov4I5ZmYx

@Controller('shops')
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}


  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    const shop = await this.shopService.create(createShopDto);

    const user = await this.userService.update(createShopDto.ownerId, {
      roles: ['seller'],
      shop: shop._id,
    });
    console.log('SUXCES', user);
    return { user, shop };
  }

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Get("/productsFromStores")
  async findAllFromProducts(@Req() req) {
    const {shopValidation} = await this.userService.validateUserAndGetShop(req)
    return this.shopService.findProductsFromAllShops(shopValidation._id);
  }


  @Get("/delievery")
  async find(@Req() req: Request) {
    console.log("HOLA")
    const {shopValidation} = await this.userService.validateUserAndGetShop(req)    
    
    return {messagerPricingList: shopValidation.messagerPricingList};
  }

  @Post("/delievery")
  async updateDelievery(@Req() req: Request, @Body()data) {
    console.log(data);
    const {shopValidation} = await this.userService.validateUserAndGetShop(req)    
    shopValidation.messagerPricingList = data.messagerPricingList;
    shopValidation.save()
    return {messagerPricingList: shopValidation.messagerPricingList};
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    console.log(id);
    return await this.shopService.findByIdWithProducts(id);
  }

  @Get('identifier/:identifier')
  async getShopByIdentifier(@Param('identifier') identifier) {
    return await this.shopService.findOne(identifier);
  }
  @Get('phone/:phone')
  async getShopByPhone(@Param('phone') identifier) {
    return await this.shopService.findOnePhone(identifier);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopDto) {
    return this.shopService.update(id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(id);
  }
}
