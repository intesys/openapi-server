import { RequestHandler } from "express";
import path from "path";
import voidMiddleware from "./void";
import { isUndefined, get, set } from "lodash";
import { MOCKS_PATH, WATCH } from "../lib/globals";
import { log } from "../lib/log";

const invalidateRequireCache = (name: string) => {
  try {
    const key = require.resolve(name);
    if (Boolean(require.cache[key])) {
      delete require.cache[key];
    }
  } catch (e) {}
};

const isFunction = (value: any): boolean => typeof value === "function";

const nodeRequireError = (err: Error): boolean => /cannot find module/.test(err.message.toLowerCase());

/**
 * @param method one value of `operations`
 * @param route path key, as example: '/item/{id}'
 */
const tryMock = (method: string, route: string): RequestHandler => (req, res, next) => {
  if (!isUndefined(get(res, "locals.body"))) {
    return voidMiddleware(req, res, next);
  }

  const mockPath = path.join(MOCKS_PATH, route, method);

  try {
    if (WATCH) {
      invalidateRequireCache(mockPath);
    }

    const mock = require(mockPath);

    if (isFunction(mock)) {
      log({
        "Request handler": "Mock (middleware)",
        "Request uri": `${method.toUpperCase()} ${req.originalUrl}`,
        "Handled by": mockPath,
      });
      return mock(req, res, next);
    }

    set(res, "locals.body", mock);
    log({
      "Request handler": "Mock (json)",
      "Request uri": `${method.toUpperCase()} ${req.originalUrl}`,
      "Handled by": mockPath,
    });
  } catch (err) {
    const error = new Error(err);
    if (!nodeRequireError(error)) {
      return next(error);
    }
    log(`\n${method.toUpperCase()} ${route} is not mocked\n To mock it, touch ${mockPath}.js(on)`);
  }

  return next();
};

export default tryMock;
