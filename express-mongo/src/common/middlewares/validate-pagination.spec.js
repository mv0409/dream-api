const { response } = require('express');
const validatePagination = require('./validate-pagination');

describe('🧪 Validate dream pagination middleware test', () => {
  const mockReq = ({ page, limit }) => ({
    query: {
      page: page || undefined,
      limit: limit || undefined
    }
  });

  const mockedNext = jest.fn();

  beforeEach(() => {
    response.locals = undefined;
    mockedNext.mockClear();
  });

  it('should call next function if req.params.page and limit are provided', () => {
    const mockedReq = mockReq({ page: 1, limit: 2 });
    validatePagination(mockedReq, response, mockedNext);
    expect(mockedReq.query).toBeDefined();
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedReq.query.page).toEqual(1);
    expect(mockedReq.query.limit).toEqual(2);
  });

  it('should throw an error if req.params.page and/or limit not provided', () => {
    const mockedReq = mockReq({});
    expect(() => {
      try {
        validateDate(mockedReq, response, mockedNext);
      } catch (error) {
        expect(error.message).toBe(`Invalid query, include page and limit in url path`);
      }
    });
    expect(mockedNext.mock.calls.length).toBe(0);
  });

  it('should throw an error if req.params.page and/or limit are NaN', () => {
    const mockedReq = mockReq({ page: 'page', limit: 'limit' });
    expect(() => {
      try {
        validateDate(mockedReq, response, mockedNext);
      } catch (error) {
        expect(error.message).toBe(`Invalid limit or page param provided`);
      }
    });
    expect(mockedNext.mock.calls.length).toBe(0);
  });
});
