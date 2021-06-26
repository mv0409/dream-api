import { IsDateString, MaxLength, MinLength } from 'class-validator';
export class CreateDreamDto {

    @MinLength(3)
    @MaxLength(40)
    type: string

    @MinLength(3)
    @MaxLength(40)
    title: string

    @MinLength(3)
    @MaxLength(40)
    description: string

    @IsDateString()
    date : Date
}