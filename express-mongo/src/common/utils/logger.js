'use strict';

const getTimeStamp = () => {
  return new Date().toISOString();
};

const warn = (namespace, message, object) => {
  if (object) {
    /* eslint-disable-next-line no-console */
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
  } else {
    /* eslint-disable-next-line no-console */
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};

const error = (namespace, message, object) => {
  if (object) {
    /* eslint-disable-next-line no-console */
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
  } else {
    /* eslint-disable-next-line no-console */
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
  }
};

const debug = (namespace, message, object) => {
  if (object) {
    /* eslint-disable-next-line no-console */
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
  } else {
    /* eslint-disable-next-line no-console */
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
  }
};

const info = (namespace, message, object) => {
  if (object) {
    /* eslint-disable-next-line no-console */
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
  } else {
    /* eslint-disable-next-line no-console */
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
  }
};

module.exports = {
  info,
  warn,
  error,
  debug
};
