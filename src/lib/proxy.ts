import { RequestHandler } from "express";
import { proxyLib } from "../config";
import { method } from "../types/proxyLib";
import { log } from "./log";
import { proxyLibs } from "./proxyLibs";

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
    const headers = req.headers;
    const method = req.method.toLowerCase() as method;

    const response = proxyLibinstance(method, fullUrl, headers)(req, res);

    // res.locals.body = response.data;
    // res.set(response.headers);
    // res.set("Forwarded", `for=${url}`);
    // log({
    //   "Request forwarded to": `${method.toUpperCase()} ${fullUrl}`,
    //   "Request body": req.body,
    //   "Response body": response.data,
    // });
    next();
  } catch (err) {
    next(err);
  }
};
