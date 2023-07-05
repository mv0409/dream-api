import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.data !== 'id') return value;
    try {
      const transformedObjectId: ObjectId = ObjectId.createFromHexString(value);
      return transformedObjectId;
    } catch (error) {
      throw new BadRequestException('Id must be a valid ObjectId value');
    }
  }
}
