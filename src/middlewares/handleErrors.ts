import { ErrorRequestHandler } from "express";
import { error as logError } from '../lib/log';
import { inspect, isString } from 'util';
import { get } from "lodash";

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
    return res.status(status).send(`Error ${status}: ${err.message}`);
  }
  return next(err);
}

const formatError = (err: any): ErrorWithStatus => {
  if (err.request) {
    err.message = stringify(err.request);
    return err;
  }
  if (err.response) {
    err.message = stringify(err.response);
    err.status = get(err, 'response.Status');
    return err;
  }
  return err;
}

const stringify = (obj: any): string => {
  return inspect(obj, { colors: true, compact: false, breakLength: Infinity }) as string;
}
