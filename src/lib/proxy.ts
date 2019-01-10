import axios from 'axios';
import { RequestHandler } from 'express';
import { log } from './log';

export default (url: string): RequestHandler => async (req, res, next) => {
  try {
    const method = req.method.toLowerCase();
    const axiosFn = axios[method];
    log(`Proxy request to: ${method.toUpperCase()} ${url}`);
    const response = await axiosFn(url, req.body);
    res.locals.body = response.data;
    next();
  } catch (err) {
    next(err);
  }
}
