import { Type } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';
export class SortDto<T> {
  @Type(() => String)
  @IsString()
  orderBy: keyof T;

  @IsString()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc';
}
