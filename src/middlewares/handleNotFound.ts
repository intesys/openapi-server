import { RequestHandler } from "express";
import { MOCKS, PROXY, MOCKS_PATH, proxyUrl } from "../lib/globals";
import { log } from "../lib/log";

export default (): RequestHandler => (req, res, next) => {
  const messages = [];
  console.log(req.url);
  MOCKS && messages.push(`- Mock not found in: ${MOCKS_PATH}`);
  PROXY && messages.push(`- Remote host called: ${proxyUrl}`);
  const notFoundMessage = `Uri ${req.url} not found \n${messages.join("\n")}`;
  res.status(404).send(notFoundMessage);
};
