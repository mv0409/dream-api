import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { DreamType } from '../enums/dreamType';

@Injectable()
export class ValidateDreamTypePipe implements PipeTransform {
  transform(value: any) {
    const dreamTypes = Object.keys(DreamType);
    if (!dreamTypes.includes(value)) {
      throw new BadRequestException(
        `Dream type must be one of possible types ${dreamTypes}`,
      );
    }
    return value;
  }
}
