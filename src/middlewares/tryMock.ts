import { RequestHandler } from "express";
import path from "path";
import voidMiddleware from "./void";
import _ from "lodash";
import { MOCKS_PATH } from "../lib/globals";
import { log } from "../lib/log";

/**
 * @param method one value of `operations`
 * @param route path key, as example: '/item/{id}'
 */
const tryMock = (method: string, route: string): RequestHandler => (
  req,
  res,
  next
) => {
  if (_.get(res, "locals.body")) {
    return voidMiddleware(req, res, next);
  }

  try {
    const mockPath = path.join(MOCKS_PATH, route, method);
    const mock = require(mockPath);

    if (isFunction(mock)) {
      log({
        "Mocking request": req.originalUrl,
        Method: method.toUpperCase(),
        "Handled by middleware": mockPath
      });
      return mock(req, res, next);
    }

    _.set(res, "locals.body", mock);
    log({
      "Mocking request": req.originalUrl,
      Method: method.toUpperCase(),
      Response: mock
    });
  } catch (err) {
    const error = new Error(err);
    if (!notFoundError(error)) {
      return next(error);
    }
  }

  return next();
};

const notFoundError = (err: Error): boolean =>
  /cannot find module/.test(err.message.toLowerCase());

const isFunction = (value: any): boolean => typeof value === "function";

export default tryMock;
