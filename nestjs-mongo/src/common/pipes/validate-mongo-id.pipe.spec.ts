import { ArgumentMetadata } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { MongoIdValidationPipe } from './validate-mongo-id.pipe'

describe('mongoId validation pipe', () => {
  let mongoIdValidationPipe: MongoIdValidationPipe;
  let metadata: ArgumentMetadata = { type: 'param', data: 'id' };
  
  beforeEach(() => {
    mongoIdValidationPipe = new MongoIdValidationPipe();
  });

  it('pipe should not throw err if valid mongoId value', () => {
    const validMongoId = '6092955deb967800219adb72';
    expect(() => mongoIdValidationPipe.transform(validMongoId, metadata)).not.toThrow();
  });

  it('pipe should cast id value to ObjectId if valid', () => {
    const validMongoId = '6092955deb967800219adb72';
    const res = mongoIdValidationPipe.transform(validMongoId, metadata);
    expect(res).toEqual(new ObjectId(validMongoId));
  });

  it('pipe should throw err if invalid mongoId value', () => {
    const validMongoId = 'invalidMongoId';
    expect(() => mongoIdValidationPipe.transform(validMongoId, metadata)).toThrow();
  });
});
