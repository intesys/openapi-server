import { RequestHandler } from "express";
import { get, isUndefined } from "lodash";
import { proxyUrl } from "../lib/globals";
import proxy from "../lib/proxy";
import voidMiddleware from "./void";

/**
 * @param method one value of `operations`
 * @param route path key, as example: '/item/{id}'
 */
const tryProxy = (method: string, route: string): RequestHandler => (req, res, next) => {
  if (!isUndefined(get(res, "locals.body"))) {
    return voidMiddleware(req, res, next);
  }

  return proxy(proxyUrl)(req, res, next);
};

export default tryProxy;
