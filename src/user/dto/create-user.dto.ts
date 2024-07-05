// create-user.dto.ts

import { IsString, IsOptional, IsMongoId, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsMongoId()
  @IsOptional()
  _id?: string; // MongoDB ObjectId for the user

  @IsString()
  name: string;

  @IsString()
  phone: string;
  
  @IsArray()
  permissions?: string[];

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  roles?: string[];

  @IsMongoId()
  @IsOptional()
  shop?: string;

  @IsString()
  @IsOptional()
  identifier?: string;
}
export class signInDto {
  @IsString()
  password: string;

  @IsString()
  email: string;

}