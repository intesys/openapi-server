import { ErrorRequestHandler } from "express";
import { isString } from 'lodash';
import { error as logError } from '../lib/log';

interface ErrorWithStatus extends Error {
  status?: number;
}

export default (): ErrorRequestHandler => (err, req, res, next) => {
  if (err) {
    logError(err.stack || err.message);
    const error = formatError(err);
    const status = error.status || res.statusCode || 500;
    return res.status(status).send(`Error ${status}: ${err.message}`);
  }
  return next(err);
}

const formatError = (err: any): ErrorWithStatus => {
  if (err.request) {
    err.status = 400;
    return err;
  }
  if (err.response) {
    err.status = parseInt(err.response.status, 10);
    return err;
  }
  return err;
}
