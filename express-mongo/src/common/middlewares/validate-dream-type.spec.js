const validateDreamType = require('./validate-dream-type');
const { possibleTypes } = require('../../entities/dream/models/dream');

describe('🧪 Validate dream type middleware test', () => {
  const mockReq = (type) => ({
    query: {
      type: type || undefined
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

  it('should call next function if type not provided, and query all dreams', () => {
    const mockedReq = mockReq();
    const mockedRes = mockRes();
    validateDreamType(mockedReq, mockedRes, mockedNext);
    expect(mockedRes.locals.queryObj).toBeDefined();
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedRes.locals.queryObj).toHaveProperty('$and', []);
  });

  it('should add type for req.query.type into queryObj', () => {
    const mockedReq = mockReq('happy');
    const mockedRes = mockRes();
    validateDreamType(mockedReq, mockedRes, mockedNext);
    expect(mockedRes.locals.queryObj).toBeDefined();
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedRes.locals.queryObj).toHaveProperty('$and', [{ type: 'happy' }]);
  });

  it('should throw an error if req.query.type does not exists', () => {
    const mockedReq = mockReq('supreme');
    const mockedRes = mockRes();
    expect(() => {
      try {
        validateDate(mockedReq, mockedRes, mockedNext);
      } catch (error) {
        expect(error.message).toBe(`Dream type must be one of possible types / (${possibleTypes})`);
      }
    });
    expect(mockedNext.mock.calls.length).toBe(0);
  });
});
