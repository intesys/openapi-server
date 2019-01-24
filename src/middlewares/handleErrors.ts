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
    return res.status(status).send(`Error ${status}: ${error.message}`);
  }
  return next(err);
}

const formatError = (err: any): ErrorWithStatus => {
  if (!err.message) {
    err.message = stringify(err);
  }
  return err;
}

const stringify = (obj: any): string => {
  return inspect(obj, { colors: false, compact: false, breakLength: Infinity }) as string;
}
