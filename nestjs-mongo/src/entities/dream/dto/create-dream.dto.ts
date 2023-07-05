import { Type } from 'class-transformer';
import { IsDate, IsEnum, MaxLength, MinLength } from 'class-validator';
import { DREAM_TYPE } from 'src/common/enums';

export class CreateDreamDto {
  @IsEnum(DREAM_TYPE)
  type: DREAM_TYPE;

  @MinLength(3)
  @MaxLength(40)
  title: string;

  @MinLength(3)
  @MaxLength(40)
  description: string;

  @Type(() => Date)
  @IsDate()
  date: Date;
}
