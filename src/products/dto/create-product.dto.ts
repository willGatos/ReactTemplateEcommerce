import { Product } from "../entities/product.entity";

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  seller: string;
  category: string;
  shop?: string;
  productList: Product[]
}
