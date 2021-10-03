import { Type } from 'class-transformer';
import { IsOptional, MaxLength, MinLength, IsDate, IsEnum } from 'class-validator';
import { DreamType } from '../../../common/enums/dreamType';

export class UpdateDreamDto {

    @IsOptional()
    @IsEnum(DreamType)
    type: DreamType

    @IsOptional()
    @MinLength(3)
    @MaxLength(40)
    title: string

    @IsOptional()
    @MinLength(3)
    @MaxLength(40)
    description: string

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    date: Date;
}
