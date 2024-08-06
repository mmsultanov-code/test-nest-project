import { IsString, IsOptional, IsEnum, IsInt, IsArray, IsJSON } from 'class-validator';

enum PageLocale {
  RU = 'ru',
  UZ = 'uz',
  EN = 'en',
}

export class UpdatePageDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsEnum(PageLocale)
  @IsOptional()
  locale?: PageLocale;

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
  updated_by?: number;
}
