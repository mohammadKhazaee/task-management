import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from 'src/auth/dto/create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
