import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  readonly address: {
    readonly street: string;
    readonly firstBetweenStreet?: string;
    readonly secondBetweenStreet?: string;
    readonly buildingNumber: string;
    readonly reference: string;
    readonly additionalDetails: string;
  };
}
