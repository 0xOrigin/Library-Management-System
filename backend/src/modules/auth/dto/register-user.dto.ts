import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ROLE_TYPE, Role } from 'src/config/constants';
import { Match } from 'src/decorators';

export class RegisterUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  password: string;

  @Exclude({ toPlainOnly: true })
  @Match('password')
  @IsNotEmpty()
  confirmPassword: string;

  @IsOptional()
  picture: string;

  @IsPhoneNumber('EG', { message: 'Please enter a valid phone number' })
  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  address: string;

  @IsOptional()
  city: string;

  @IsNotIn([Role.ADMIN], { message: 'This role is not allowed' })
  @IsEnum(Role, {
    message: `role must be one of the following values: [${Object.values(Role)
      .filter((role) => role !== Role.ADMIN)
      .join(', ')}]`,
  })
  @IsNotEmpty()
  role: ROLE_TYPE;

  constructor(partial: Partial<RegisterUserDto>) {
    Object.assign(this, partial);
  }
}
