import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { SortDto } from './sort.dto';
export class QueryDto<Domain, FilterDto> {
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => {
    try {
      return value
        ? JSON.parse(value).map((item) =>
            plainToInstance(SortDto<Domain>, item),
          )
        : undefined;
    } catch (error) {
      throw new BadRequestException('Invalid JSON format for sort.');
    }
  })
  @ValidateNested({ each: true })
  @Type(() => SortDto<Domain>)
  sort?: SortDto<Domain>[] | null;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  filters?: FilterDto | null;
}
