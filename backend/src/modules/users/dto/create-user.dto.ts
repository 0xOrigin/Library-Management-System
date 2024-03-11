import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ROLE_TYPE, Role } from 'src/config/constants';

export class CreateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  password: string;

  @IsOptional()
  picture: string;

  @IsPhoneNumber('EG', { message: 'Please enter a valid phone number' })
  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  address: string;

  @IsOptional()
  city: string;

  @IsEnum(Role, { message: 'Invalid role' })
  @IsNotEmpty()
  role: ROLE_TYPE;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
