import {
  IsBooleanString,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsConfirmPass } from '../confirm-pass.decorator';

export class CreateAccountDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MaxLength(32)
  @IsStrongPassword({
    minLength: 5,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsConfirmPass('password', { message: 'Passwords are not the same!' })
  @IsString()
  confirmPass: string;

  @IsBooleanString()
  isAdmin: string;
}
