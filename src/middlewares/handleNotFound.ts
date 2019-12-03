import { RequestHandler } from "express";
import { MOCKS, PROXY, MOCKS_PATH, proxyUrl } from "../lib/globals";

export default (): RequestHandler => (req, res, next) => {
  const messages = [];
  console.log(req.url);
  MOCKS && messages.push(`mock in ${MOCKS_PATH}`);
  PROXY && messages.push(`remote ${proxyUrl}`);
  const notFoundMessage = `Uri ${req.url} not found: ${messages.join(", ")}.`;
  res.status(404).send(notFoundMessage);
};
