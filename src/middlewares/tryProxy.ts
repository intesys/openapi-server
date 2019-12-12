import { RequestHandler } from "express";
import expressProxy from "express-http-proxy";
import { get, isUndefined } from "lodash";
import path from "path";
import { port, prefix, PROXY_HOSTNAME, PROXY_PROTOCOL } from "../lib/globals";

export class RemoteError {
  _remote: boolean;
  source: string;
  error: any;

  constructor(source: string, error: any) {
    this._remote = true;
    this.source = source;
    this.error = error;
  }
}

/**
 * @param method one value of `operations`
 * @param route path key, as example: '/item/{id}'
 */
const tryProxy = (method: string, route: string): RequestHandler => {
  const proxyUrl = `${PROXY_PROTOCOL}://${PROXY_HOSTNAME}${port}`;
  return expressProxy(proxyUrl, {
    proxyReqPathResolver: function(req) {
      // add prefix
      return path.posix.join(prefix, req.url);
    },
    filter: function(req, res) {
      // don't proxy request if res.locals.body is already defined
      return isUndefined(get(res, "locals.body"));
    },
    proxyErrorHandler: function(err, res, next) {
      const error = new RemoteError(proxyUrl, err);
      next(error);
    },
  });
};

export default tryProxy;
