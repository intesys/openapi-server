import axios from "axios";
import http from "http";
import https from "https";
import { RequestHandler } from "express";
import { log } from "./log";

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
  const fullUrl = `${url}${req.url}`;
  try {
    const headers = req.headers;
    const method = req.method.toLowerCase();
    const response = await axios({
      method,
      headers,
      url: fullUrl,
      data: req.body,
      withCredentials: true,
      httpAgent: new http.Agent(),
      httpsAgent: new https.Agent()
    });
    res.locals.body = response.data;
    res.set(response.headers);
    res.set("Forwarded", `for=${url}`);
    log({
      "Request forwarded to": `${method.toUpperCase()} ${fullUrl}`,
      "Request body": req.body,
      "Response body": response.data
    });
    next();
  } catch (err) {
    if (err.response) {
      // it's an axios error
      next(new RemoteError(fullUrl, err.response));
      return;
    }
    next(err);
  }
};
