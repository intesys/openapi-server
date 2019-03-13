import axios from 'axios';
import { RequestHandler } from 'express';
import { log } from './log';

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
    log({
      'Proxy request to': fullUrl,
      'Method': method.toUpperCase(),
      'Request body': req.body,
      'Response': response.data
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
