import { ErrorRequestHandler } from "express";
import { error as logError } from "../lib/log";
import { inspect } from "util";
import { RemoteError } from "../lib/proxy";

interface ErrorWithStatus extends Error {
  status?: number;
}

export default (): ErrorRequestHandler => (err, req, res, next) => {
  if (err) {
    if (err instanceof RemoteError) {
      return handleRemoteError(err, req, res, next);
    }
    return handleLocalError(err, req, res, next);
  }
  return next(err);
};

export const handleRemoteError: ErrorRequestHandler = (err, req, res) => {
  const { error } = err;
  const { data, response } = error;

  logError({
    Request: `${req.method.toUpperCase()} ${req.originalUrl}`,
    Status: response.status,
    Source: err.source,
    Headers: response.headers,
    Error: response.data,
  });
  const statusCode = response.status || res.statusCode || 500;
  res.set(response.headers);
  res.status(statusCode);
  return res.send(data);
};

const handleLocalError: ErrorRequestHandler = (err, req, res) => {
  logError({
    Request: `${req.method.toUpperCase()} ${req.originalUrl}`,
    Error: err,
  });
  const error = formatError(err);
  const status = error.status || res.statusCode || 500;
  res.status(status);
  return res.send(error.message);
};

const formatError = (err: any): ErrorWithStatus => {
  if (!err.message) {
    err.message = stringify(err);
  }
  if (!err.status && err.Status) {
    err.status = err.Status;
  }
  return err;
};

const stringify = (obj: any): string => {
  return inspect(obj, {
    colors: false,
    compact: false,
    breakLength: Infinity,
  }) as string;
};
