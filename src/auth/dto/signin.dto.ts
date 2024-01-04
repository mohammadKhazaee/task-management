import { OmitType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';

export class SigninDto extends OmitType(CreateAccountDto, [
  'confirmPass',
] as const) {}
