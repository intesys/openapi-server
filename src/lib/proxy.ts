import axios from 'axios';
import { RequestHandler } from 'express';
import { log, error } from './log';

export default (url: string): RequestHandler => async (req, res, next) => {
  try {
    const method = req.method.toLowerCase();
    const axiosFn = axios[method];
    const response = await axiosFn(url, req.body);
    res.locals.body = response.data;
    log({
      'Proxy request to': url,
      'Method': method.toUpperCase(),
      'Request body': req.body,
      'Response body': response
    });
    next();
  } catch (err) {
    const _err = {
      Request: req.path,
      Proxy: `${req.method.toUpperCase()} ${url}`
    }

    if (err.response) {
      next({
        ..._err,
        Status: err.response.status,
        Headers: err.response.headers,
        Data: err.response.data
      });
      return;
    }

    next({
      ..._err,
      Error: err
    });
  }
}
