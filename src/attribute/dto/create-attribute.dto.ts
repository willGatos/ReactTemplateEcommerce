import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsString } from 'class-validator';

export class CreateAttributeDto {
    @IsNotEmpty()
    id: string;
  
    @IsNotEmpty()
    name: string;
  
    @IsArray()
    @IsString({ each: true })
    options: string[];
}
