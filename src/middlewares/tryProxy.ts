import { RequestHandler } from "express";
import voidMiddleware from "./void";
import proxy from "../lib/proxy";
import _ from "lodash";
import {
  PROXY_PROTOCOL,
  PROXY_HOSTNAME,
  PROXY_PORT,
  PROXY_PREFIX,
  proxyUrl
} from "../lib/globals";

/**
 * @param method one value of `operations`
 * @param route path key, as example: '/item/{id}'
 */
const tryProxy = (method: string, route: string): RequestHandler => (
  req,
  res,
  next
) => {
  if (!_.isUndefined(_.get(res, "locals.body"))) {
    return voidMiddleware(req, res, next);
  }

  return proxy(proxyUrl)(req, res, next);
};

export default tryProxy;
