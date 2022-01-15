import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsEnum, IsUrl } from 'class-validator';

export enum Form {
  json = 'json',
  xml = 'xml',
}
//get query elements from url and matching object with urlDto
export class urlDto {
  //user is Required
  @IsNotEmpty()
  @IsUrl()
  url: string;
  //others are optional
  @IsOptional()
  @IsInt()
  //type transforming
  @Type(() => Number)
  maxwidth: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  maxheight: number;

  //format should have enum(Form) value but it is optional
  @IsOptional()
  @IsEnum(Form)
  format: Form;
}
