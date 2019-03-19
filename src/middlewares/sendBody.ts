import { RequestHandler } from "express";
import _ from 'lodash';
import { log } from "../lib/log";

const sendBody = (): RequestHandler => (req, res, next) => {
  if (_.get(res, 'locals.body')) {
    return res.send(res.locals.body);
  }
  return next();
};

export default sendBody;
