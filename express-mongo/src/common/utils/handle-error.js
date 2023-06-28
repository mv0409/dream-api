'use strict';

const handleError = (res, err) =>
  res
    .status(err.code || 500)
    .send({ error: err.message })
    .end();

module.exports = handleError;
