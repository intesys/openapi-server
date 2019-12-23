import { RequestHandler } from "express";
import path from "path";
import voidMiddleware from "./void";
import { isUndefined, get, set } from "lodash";
import { MOCKS_PATH, WATCH } from "../lib/globals";
import { log } from "../lib/log";

/**
 * @param method one value of `operations`
 * @param route path key, as example: '/item/{id}'
 */
const tryMock = (method: string, route: string): RequestHandler => (req, res, next) => {
  if (!isUndefined(get(res, "locals.body"))) {
    return voidMiddleware(req, res, next);
  }

  try {
    const mockPath = path.join(MOCKS_PATH, route, method);

    if (WATCH) {
      invalidateRequireCache(mockPath);
    }

    const mock = require(mockPath);

    if (isFunction(mock)) {
      log({
        Mode: "mock",
        Request: `${method.toUpperCase()} ${req.originalUrl}`,
        Middleware: mockPath,
      });
      return mock(req, res, next);
    }

    set(res, "locals.body", mock);
    log({
      Mode: "mock",
      Request: `${method.toUpperCase()} ${req.originalUrl}`,
    });
  } catch (err) {
    const error = new Error(err);
    if (!notFoundError(error)) {
      return next(error);
    }
  }

  return next();
};

const notFoundError = (err: Error): boolean => /cannot find module/.test(err.message.toLowerCase());

const isFunction = (value: any): boolean => typeof value === "function";

const invalidateRequireCache = (name: string) => {
  try {
    const key = require.resolve(name);
    if (Boolean(require.cache[key])) {
      delete require.cache[key];
    }
  } catch (e) {}
};

export default tryMock;
