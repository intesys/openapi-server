import axios from 'axios';
import { RequestHandler } from 'express';
import { log, error } from './log';
import { PROXY_PREFIX } from './globals';

export default (url: string): RequestHandler => async (req, res, next) => {
  try {
    const method = req.method.toLowerCase();
    // const axiosFn = axios[method];
    const response = await axios({
      method,
      url: `${url}${req.url}`,
      data: req.body
    });
    res.locals.body = response.data;
    log({
      'Proxy request to': url,
      'Method': method.toUpperCase(),
      'Request body': req.body,
      'Response body': response
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
}
