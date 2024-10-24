import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @Length(1, 20) 
  id: string; 

  @IsString()
  @Length(1, 100)  
  name: string;

  @IsEmail()  
  email: string;

  @IsString()  
  password: string;

  @IsOptional()  
  @IsString()
  @Length(1, 15)  
  phone?: string;  
}
