import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { SortType } from '../sort-type.enum';

export class TaskQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(SortType)
  @IsOptional()
  sortType?: SortType;

  @IsNumberString()
  @IsOptional()
  page?: string;
}
