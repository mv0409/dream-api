const {
  throwBadRequestError,
  throwUnauthorizedError,
  throwForbiddenError,
  throwNotFoundError,
  throwConflictError,
  ErrorHandler
} = require('./http-error');

describe('🧪 Http error test', () => {
  it('Throws bad request error', () => {
    expect.assertions(3);
    try {
      throwBadRequestError('bad request');
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error).toHaveProperty('code', 400);
      expect(error).toHaveProperty('message', 'bad request');
    }
  });

  it('Throws unauthorized request error', () => {
    expect.assertions(3);
    try {
      throwUnauthorizedError('unauthorized');
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error).toHaveProperty('code', 401);
      expect(error).toHaveProperty('message', 'unauthorized');
    }
  });

  it('Throws forbidden request error', () => {
    expect.assertions(3);
    try {
      throwForbiddenError('forbidden');
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error).toHaveProperty('code', 403);
      expect(error).toHaveProperty('message', 'forbidden');
    }
  });

  it('Throws not found request error', () => {
    expect.assertions(3);
    try {
      throwNotFoundError('not found');
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error).toHaveProperty('code', 404);
      expect(error).toHaveProperty('message', 'not found');
    }
  });

  it('Throws conflict request error', () => {
    expect.assertions(3);
    try {
      throwConflictError('conflict');
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error).toHaveProperty('code', 409);
      expect(error).toHaveProperty('message', 'conflict');
    }
  });
});
