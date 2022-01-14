import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

//get query elements from url and matching object with urlDto
export class urlDto {
  //user is Required
  @IsNotEmpty()
  @IsString()
  url: string;
  //others are optional
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
