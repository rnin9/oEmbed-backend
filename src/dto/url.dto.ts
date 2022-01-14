import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class urlDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  maxwidth: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  maxheight: number;

  @IsOptional()
  format: string;
}
