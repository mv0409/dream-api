import { Type } from 'class-transformer';
import { IsOptional, MaxLength, MinLength, IsDate, IsEnum } from 'class-validator';
import { DREAM_TYPE } from 'src/common/enums';

export class UpdateDreamDto {
  @IsOptional()
  @IsEnum(DREAM_TYPE)
  type: DREAM_TYPE;

  @IsOptional()
  @MinLength(3)
  @MaxLength(40)
  title: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(40)
  description: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date: Date;
}
