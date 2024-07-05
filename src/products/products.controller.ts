import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Req,
  Res
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ShopService } from 'src/shop/shop.service';
import { CategoryService } from 'src/category/category.service';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';
import { Type } from 'class-transformer';
/* import validateUserAndGetShop from 'src/helper/validateUserAndGetShop';
 */
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly shopService: ShopService,
    private readonly userService: UserService,
    private readonly categoriesService: CategoryService,
    private readonly subcategoriesService: SubcategoryService,
    private readonly jwtService: JwtService
    ) {}

  @Post()
  async create( @Req() req: Request, @Body() createProductDto) {

        if (createProductDto.subcategory == "newSub") {
          const newSub = await this.subcategoriesService.create({name: createProductDto.newSubcategory })
          createProductDto.subcategory = newSub._id;
          console.log(createProductDto.subcategory)
          const data = await this.categoriesService.updateSub(createProductDto.category, newSub._id);
          console.log(data);
        }
        
        const product = await this.productService.create(createProductDto);

        const {shopValidation} = await this.userService.validateUserAndGetShop(req)
        shopValidation.productList.push(product._id)
        shopValidation.save()
        
        return {success: true}
  }
  
  

  @Get('/findBrandCategoriesAndSub')
  async findBrandCategoriesAndSub() {
    const categories = await this.categoriesService.findAll()
    const subcategories = await this.subcategoriesService.findAll()
    return {categories, subcategories}
  }

 @Post('getFiltered')
 async searchProducts(@Body() searchParams, @Req() req) {
    const { pageIndex, pageSize, sort, query, filterData } = searchParams;
    const {shopValidation} = await this.userService.validateUserAndGetShop(req)
    // console.log(searchParams)
    // Preparar los datos de filtrado
    const filterDataAdjusted = {
      ...filterData,
      query,
      sort,
    };

    console.log( "I + A", searchParams )

    // Llamar al servicio con los parámetros de búsqueda
    const result = await this.productService.findProducts(filterDataAdjusted, pageIndex, pageSize, shopValidation);

    // Devolver el resultado
    return result;
 }

 @Post('getFiltered')
 async searchProductsFromAllStores(@Body() searchParams, @Req() req) {
    const { pageIndex, pageSize, sort, query, filterData } = searchParams;
    const {shopValidation} = await this.userService.validateUserAndGetShop(req)
    // console.log(searchParams)
    // Preparar los datos de filtrado
    const filterDataAdjusted = {
      ...filterData,
      query,
      sort,
    };

    console.log( "I + A", searchParams )

    // Llamar al servicio con los parámetros de búsqueda
    const result = await this.productService.findProducts(filterDataAdjusted, pageIndex, pageSize, shopValidation);

    // Devolver el resultado
    return result;
 }

 @Get()
 findOne(@Query('id') id: string) {
   console.log(id);
   return this.productService.findOne(id);
 }

  @Get('shop/:id')
  findAllProducts(@Param('id') id: string) {
    return this.productService.findAllByShopId(id);
  }

  @Get(':category')
  findAllQuery(
    @Param('category') category: string, 
    @Query() query: any) {
      const {color, size, limit, skip} = query;
    return this.productService.findAllByCategory(category, color, size,limit, skip);
  }

  @Put()
  update(@Query('id') id: string, @Body() updateProductDto) {
    console.log( id , updateProductDto );
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
