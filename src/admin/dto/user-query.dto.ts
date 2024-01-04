import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { UserSortType } from '../user-sort-type.enum';

export class UserQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(UserSortType)
  @IsOptional()
  sortType?: UserSortType;

  @IsNumberString()
  @IsOptional()
  page?: string;
}
