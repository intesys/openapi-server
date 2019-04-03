import { RequestHandler } from "express";

export default (): RequestHandler => (req, res, next) => {
  res.set("Via", "HTTP/1.1 openapi-server");
  return next();
};
