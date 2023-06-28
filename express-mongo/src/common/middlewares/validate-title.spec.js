const validateTitle = require('./validate-title');

describe('🧪 Validate dream title middleware test', () => {
  const mockReq = (title) => ({
    query: {
      title: title || undefined
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

  it('should call next function if title not provided, and query all dreams', () => {
    const mockedReq = mockReq();
    const mockedRes = mockRes();
    validateTitle(mockedReq, mockedRes, mockedNext);
    expect(mockedRes.locals.queryObj).toBeDefined();
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedRes.locals.queryObj).toHaveProperty('$and', []);
  });

  it('should add type for req.query.type into queryObj', () => {
    const mockedReq = mockReq('Cool title');
    const mockedRes = mockRes();
    validateTitle(mockedReq, mockedRes, mockedNext);
    expect(mockedRes.locals.queryObj).toBeDefined();
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
      { title: mockedRes.locals.queryObj.$and[0].title }
    ]);
  });
});
