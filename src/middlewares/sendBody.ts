import { RequestHandler } from "express";
import { get, isUndefined } from "lodash";

const sendBody = (): RequestHandler => (req, res, next) => {
  if (!isUndefined(get(res, "locals.body"))) {
    return res.send(res.locals.body);
  }
  return next();
};

export default sendBody;
