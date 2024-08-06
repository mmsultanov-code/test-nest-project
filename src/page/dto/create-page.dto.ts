import { IsString, IsOptional, IsEnum, IsInt, IsArray, IsJSON, IsNotEmpty } from 'class-validator';

enum PageLocale {
  RU = 'ru',
  UZ = 'uz',
  EN = 'en',
}

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsEnum(PageLocale)
  @IsOptional()
  locale?: PageLocale = PageLocale.RU;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  page_thumbnail?: string;

  @IsString()
  @IsOptional()
  meta_title?: string;

  @IsString()
  @IsOptional()
  meta_description?: string;

  @IsString()
  @IsOptional()
  meta_keywords?: string;

  @IsInt()
  @IsOptional()
  parent_page_id?: number;

  @IsArray()
  @IsOptional()
  @IsJSON()
  constr?: [];

  @IsInt()
  @IsOptional()
  creator_id?: number;
}