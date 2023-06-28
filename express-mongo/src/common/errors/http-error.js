'use strict';

class ErrorHandler extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

const throwBadRequestError = (message) => {
  throw new ErrorHandler(400, message);
};

const throwUnauthorizedError = (message) => {
  throw new ErrorHandler(401, message);
};

const throwForbiddenError = (message) => {
  throw new ErrorHandler(403, message);
};

const throwNotFoundError = (message) => {
  throw new ErrorHandler(404, message);
};

const throwConflictError = (message) => {
  throw new ErrorHandler(409, message);
};

module.exports = {
  ErrorHandler,
  throwBadRequestError,
  throwUnauthorizedError,
  throwForbiddenError,
  throwNotFoundError,
  throwConflictError
};
