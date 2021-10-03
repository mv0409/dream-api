import { DreamType } from '../enums/dreamType';
import { ValidateDreamTypePipe } from './validate-dream-type.pipe'


describe('test dream type pipe', () => {
  let validateDreamTypePipe: ValidateDreamTypePipe;
  
  beforeEach(() => {
    validateDreamTypePipe = new ValidateDreamTypePipe();
  });

  it('pipe should not throw err if valid date type passed', () => {
    const type = Object.keys(DreamType)[0]
    expect(() => validateDreamTypePipe.transform(type)).not.toThrow();
  });

  it('pipe should throw err if invalid date type passed', () => {
    const type = 'invalidDate';
    expect(() => validateDreamTypePipe.transform(type)).toThrow();
  });
});