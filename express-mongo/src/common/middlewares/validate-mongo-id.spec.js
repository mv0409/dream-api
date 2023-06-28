const { response } = require('express');
const validateMongoId = require('./validate-mongo-id');
const mongoose = require('mongoose');

describe('🧪 Validate dream mongo id middleware test', () => {
  const mockReq = (id) => ({
    params: {
      id: id || undefined
    }
  });
  const mockedNext = jest.fn();

  beforeEach(() => {
    response.locals = undefined;
    mockedNext.mockClear();
  });

  it('should call next function if req.params.id is provided', () => {
    const id = mongoose.Types.ObjectId().toHexString();
    const mockedReq = mockReq(id);
    validateMongoId(mockedReq, response, mockedNext);
    expect(mockedReq.params.id).toBeDefined();
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedReq.params.id).toEqual(id);
  });

  it('should throw an error if req.params.id not provided', () => {
    const mockedReq = mockReq();
    expect.assertions(1);
    expect(() => {
      try {
        validateMongoId(mockedReq, response, mockedNext);
      } catch (error) {
        expect(error.message).toBe(`Include id param in request`);
      }
    });
    expect(mockedNext.mock.calls.length).toBe(0);
  });

  it('should throw an error if req.params.id not valid mongo id', () => {
    const id = mongoose.Types.ObjectId()
      .toHexString()
      .slice(0, mongoose.Types.ObjectId().toHexString().length - 1);
    const mockedReq = mockReq(id);
    expect(() => {
      try {
        validateMongoId(mockedReq, response, mockedNext);
      } catch (error) {
        expect(error.message).toBe(`Not valid mongo id`);
      }
    });
    expect(mockedNext.mock.calls.length).toBe(0);
  });
});
