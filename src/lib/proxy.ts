import { RequestHandler } from "express";
import { proxyLib } from "../config";
import { method, ProxyLib, ProxyResponse } from "../types/proxyLib";
import { PROXY_FILTER_HEADERS } from "./globals";
import { log } from "./log";
import { proxyLibs } from "./proxyLibs";
import { filterHeaders } from "./proxyLibs/utils";

export const proxyLibinstance: ProxyLib = proxyLibs[proxyLib];

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
 * @param {string} url fully qualified url
 */
export default (url: string): RequestHandler => async (req, res, next) => {
  try {
    const fullUrl = `${url}${req.url}`;
    const method = req.method.toLowerCase() as method;
    const headers = PROXY_FILTER_HEADERS ? filterHeaders(req.headers) : req.headers;

    const response: ProxyResponse = await proxyLibinstance(method, fullUrl, headers)(req, res);

    const responseHeaders = PROXY_FILTER_HEADERS ? filterHeaders(response.headers) : response.headers;

    res.set(responseHeaders);
    res.set("Forwarded", `for=${url}`);
    res.status(response.status);

    res.locals.body = response.data;

    if (response.status >= 400 && !response.data) {
      // avoid to pass to next middleware
      res.locals.body = "";
    }

    log({
      "Request handler": "Proxy",
      "Request forwarded to": `${method.toUpperCase()} ${fullUrl} ${PROXY_FILTER_HEADERS ? "(filtered headers)" : ""}`,
      "Request headers": headers,
      "Request body": req.body,
      "Response status": response.status,
      "Response headers": responseHeaders,
      "Response body": response.data,
    });

    next();
  } catch (err) {
    next(err);
  }
};
