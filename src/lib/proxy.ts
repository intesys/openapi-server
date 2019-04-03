import axios from "axios";
import { RequestHandler } from "express";
import { log } from "./log";

export default (url: string): RequestHandler => async (req, res, next) => {
  try {
    const headers = req.headers;
    const method = req.method.toLowerCase();
    const fullUrl = `${url}${req.url}`;
    const response = await axios({
      method,
      headers,
      url: fullUrl,
      data: req.body,
      withCredentials: true
    });
    res.locals.body = response.data;
    res.set(response.headers);
    res.set("Forwarded", `for${url}`);
    log({
      "Request forwarded to": `${method.toUpperCase()} ${fullUrl}`,
      "Request body": req.body,
      "Response body": response.data
    });
    next();
  } catch (err) {
    if (err.response) {
      next({
        Status: err.response.status,
        Headers: err.response.headers,
        Data: err.response.data
      });
      return;
    }
    next(err);
  }
};
