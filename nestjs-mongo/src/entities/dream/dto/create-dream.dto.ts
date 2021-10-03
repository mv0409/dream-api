import { Type } from 'class-transformer';
import { IsDate, IsEnum, MaxLength, MinLength } from 'class-validator';
import { DreamType } from '../../../common/enums/dreamType';

export class CreateDreamDto {

    @IsEnum(DreamType)
    type: DreamType

    @MinLength(3)
    @MaxLength(40)
    title: string

    @MinLength(3)
    @MaxLength(40)
    description: string

    @Type(() => Date)
    @IsDate()
    date: Date;
}
