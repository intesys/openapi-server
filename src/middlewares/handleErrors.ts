import { ErrorRequestHandler } from "express";
import { error as logError } from '../lib/log';

interface ErrorWithStatus extends Error {
  status?: number;
}

export default (): ErrorRequestHandler => (err, req, res, next) => {
  if (err) {
    logError({
      'Request': `${req.method.toUpperCase()} ${req.originalUrl}`,
      'Error': err
    });
    const error = formatError(err);
    const status = error.status || res.statusCode || 500;
    const message = err.message || err.Data || '';
    return res.status(status).send(`Error ${status}: ${message}`);
  }
  return next(err);
}

const formatError = (err: any): ErrorWithStatus => {
  if (err.request) {
    return err.request;
  }
  if (err.response) {
    return err.response;
  }
  return err;
}
