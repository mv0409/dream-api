import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { DREAM_TYPE } from '../enums';

@Injectable()
export class ValidateDreamTypePipe implements PipeTransform {
  transform(value: any) {
    const dreamTypes = Object.values(DREAM_TYPE);
    if (!dreamTypes.includes(value)) {
      throw new BadRequestException(`Dream type must be one of possible types ${dreamTypes}`);
    }
    return value;
  }
}
