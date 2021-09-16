'use strict';

const handleResponse = (res, data) => res.status(200).send(data);

module.exports = handleResponse;
