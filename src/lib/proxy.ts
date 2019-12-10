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

    const response = await proxyLibinstance(method, fullUrl, headers)(req, res);

    res.locals.body = response.data;

    // On postman app, it works only if this set is not made. although it goes with weird headers.
    // Note that these headers inside response are pretty similar to the ones that appear when a
    // direct call to the gateway is done, so I believe the problem is not on them. Take a look
    // at postmanRequest.ts

    // res.set(response.headers);

    res.set("Forwarded", `for=${url}`);
    res.set("Content-Type", response.headers["content-type"]);
    res.set("Id", response.headers["id"]);
    res.set("AuthToken", response.headers["authtoken"]);
    // Here headers are being set manually because passing the whole load of response headers directly
    // just like in the commented line of code above causes unexpected issues

    console.log(res.getHeaders());
    log({
      "Request forwarded to": `${method.toUpperCase()} ${fullUrl}`,
      "Request body": req.body,
      "Response body": response.data,
    });
    next();
  } catch (err) {
    next(err);
  }
};
