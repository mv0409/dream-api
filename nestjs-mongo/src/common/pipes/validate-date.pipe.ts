import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateDatePipe implements PipeTransform {
  transform(value: any) {
    if (value) {
      const transormedDate: any = new Date(value);
      if (transormedDate == 'Invalid Date')
        throw new BadRequestException('Invalid date provided');
      return transormedDate;
    } else {
      return;
    }
  }
}

