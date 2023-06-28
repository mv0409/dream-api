const validateDate = require('./validate-date');

describe('🧪 Validate date middleware test', () => {
  const mockReq = ({ startDate, endDate }) => ({
    query: {
      startDate: startDate || undefined,
      endDate: endDate || undefined
    }
  });

  const mockRes = () => ({
    get: () => {},
    locals: { queryObj: { $and: [] } }
  });

  const mockedNext = jest.fn();

  beforeEach(() => {
    mockedNext.mockClear();
  });

  it('should push all time date req.query into queryObj and pass it to next middleware', () => {
    const mockedRes = mockRes();
    const mockedReq = mockReq({});
    validateDate(mockedReq, mockedRes, mockedNext);
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedRes.locals.queryObj).toBeDefined();
    expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
      { date: { $lt: mockedRes.locals.queryObj.$and[0].date.$lt } }
    ]);
  });

  it('should push startDate req.query into queryObj and pass it to next middleware', () => {
    const mockedRes = mockRes();
    const mockedReq = mockReq({ startDate: '2021-11-28' });
    validateDate(mockedReq, mockedRes, mockedNext);
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedRes.locals.queryObj).toBeDefined();
    expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
      { date: { $gt: mockedRes.locals.queryObj.$and[0].date.$gt } }
    ]);
  });

  it('should push endDate req.query into queryObj and pass it to next middleware', () => {
    const mockedRes = mockRes();
    const mockedReq = mockReq({ endDate: '2021-11-28' });
    validateDate(mockedReq, mockedRes, mockedNext);
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedRes.locals.queryObj).toBeDefined();
    expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
      { date: { $lt: mockedRes.locals.queryObj.$and[0].date.$lt } }
    ]);
  });

  it('should push startDate and endDate req.query into queryObj and pass it to next middleware', () => {
    const mockedRes = mockRes();
    const mockedReq = mockReq({
      startDate: '2020-11-28',
      endDate: '2021-11-28'
    });
    validateDate(mockedReq, mockedRes, mockedNext);
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedRes.locals.queryObj).toBeDefined();
    expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
      {
        date: {
          $gt: mockedRes.locals.queryObj.$and[0].date.$gt,
          $lt: mockedRes.locals.queryObj.$and[0].date.$lt
        }
      }
    ]);
  });

  it('should throw and error if req.query.startDate is invalid date or format', () => {
    const mockedRes = mockRes();
    const mockedReq = mockReq({ startDate: '2021-30-30' });
    expect(() => {
      try {
        validateDate(mockedReq, mockedRes, mockedNext);
      } catch (error) {
        expect(error.message).toBe('Invalid date');
      }
    });
    expect(mockedNext.mock.calls.length).toBe(0);
  });

  it('should throw and error if req.query.endDate is invalid date or format', () => {
    const mockedRes = mockRes();
    const mockedReq = mockReq({ startDate: 'notdate' });
    expect(() => {
      try {
        validateDate(mockedReq, mockedRes, mockedNext);
      } catch (error) {
        expect(error.message).toBe('Invalid date');
      }
    });
    expect(mockedNext.mock.calls.length).toBe(0);
  });

  it('should throw and error if req.query.endDate and req.query.startDate are invalid dates or formats', () => {
    const mockedRes = mockRes();
    const mockedReq = mockReq({ startDate: 'notdate', endDate: '2012-11-11' });
    expect(() => {
      try {
        validateDate(mockedReq, mockedRes, mockedNext);
      } catch (error) {
        expect(error.message).toBe('Invalid date');
      }
    });
    expect(mockedNext.mock.calls.length).toBe(0);
  });
});
