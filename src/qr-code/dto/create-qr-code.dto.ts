import { IsString, IsNotEmpty, isString } from 'class-validator';

export class CreateQrCodeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
