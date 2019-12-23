import { RequestHandler } from "express";
import { MOCKS, PROXY, MOCKS_PATH, proxyUrl } from "../lib/globals";
import { log } from "../lib/log";

export default (): RequestHandler => (req, res, next) => {
  const messages = [];
  log(`${req.method} ${req.url} not found. Look for mock in ${MOCKS_PATH} or remote on ${proxyUrl}`);
  MOCKS && messages.push(`mock in ${MOCKS_PATH}`);
  PROXY && messages.push(`remote ${proxyUrl}`);
  const notFoundMessage = `Uri ${req.url} not found: ${messages.join(", ")}.`;
  res.status(404).send(notFoundMessage);
};
