import { ValidateDatePipe } from './validate-date.pipe';

describe('date validation pipe', () => {
  let validateDatePipe: ValidateDatePipe;

  beforeEach(() => {
    validateDatePipe = new ValidateDatePipe();
  });

  it('pipe should not throw err if valid date format passed', () => {
    const date = '2020-11-11';
    expect(() => validateDatePipe.transform(date)).not.toThrow();
  });

  it('pipe should cast date value to if valid', () => {
    const date = '2020-11-11';
    const res = validateDatePipe.transform(date);
    expect(res).toEqual(new Date(date));
  });

  it('pipe should throw err if invalid date instace', () => {
    const date = 'invalidDate';
    expect(() => validateDatePipe.transform(date)).toThrow();
  });
});
