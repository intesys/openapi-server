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

const handleRemoteError: ErrorRequestHandler = (err, req, res) => {
  const { error } = err;
  const { data, headers, status } = error;
  logError({
    Request: `${req.method.toUpperCase()} ${req.originalUrl}`,
    Status: status,
    Source: err.source,
    Headers: headers,
    Error: data,
  });
  const statusCode = error.status || res.statusCode || 500;
  res.set(headers);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatError = (err: any): ErrorWithStatus => {
  if (!err.message) {
    err.message = stringify(err);
  }
  if (!err.status && err.Status) {
    err.status = err.Status;
  }
  return err;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringify = (obj: any): string => {
  return inspect(obj, {
    colors: false,
    compact: false,
    breakLength: Infinity,
  }) as string;
};
