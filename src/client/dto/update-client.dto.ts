import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsNotEmpty()
  address: {
    street: string;
    firstBetweenStreet?: string;
    secondBetweenStreet?: string;
    buildingNumber: string;
    reference: string;
    additionalDetails: string;
  };
}
