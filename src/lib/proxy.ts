import { RequestHandler } from "express";
import { proxyLib } from "../config";
import { method } from "../types/proxyLib";
import { log } from "./log";
import { proxyLibs } from "./proxyLibs";
import { filterHeaders } from "./proxyLibs/utils";
import { PROXY_FILTER_HEADERS } from "./globals";

export const proxyLibinstance = proxyLibs[proxyLib];

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

export default (url: string): RequestHandler => async (req, res, next) => {
  try {
    const fullUrl = `${url}${req.url}`;
    const headers = PROXY_FILTER_HEADERS ? filterHeaders(req.headers) : req.headers;
    const method = req.method.toLowerCase() as method;
    const response = await proxyLibinstance(method, fullUrl, headers)(req, res);
    const responseHeaders = PROXY_FILTER_HEADERS ? filterHeaders(response.headers) : response.headers;
    res.locals.body = response.data;
    res.set(responseHeaders);
    res.set("Forwarded", `for=${url}`);
    log({
      "Request forwarded to": `${method.toUpperCase()} ${fullUrl} ${PROXY_FILTER_HEADERS && "(filtered headers)"}`,
      "Request headers": headers,
      "Request body": req.body,
      "Reponse headers": responseHeaders,
      "Response body": response.data,
    });
    next();
  } catch (err) {
    next(err);
  }
};
