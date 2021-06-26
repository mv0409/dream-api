import { IsOptional, IsDateString, MaxLength, MinLength } from 'class-validator';
export class updateDreamDto {

    @MinLength(3)
    @MaxLength(40)
    @IsOptional()
    type: string

    @MinLength(3)
    @MaxLength(40)
    @IsOptional()
    title: string

    @MinLength(3)
    @MaxLength(40)
    @IsOptional()
    description: string

    @IsDateString()
    @IsOptional()
    date : Date
}

