import { SKIP_VALIDATION } from "../lib/globals";
import { RequestHandler } from "express";
import tryMock from "../middlewares/tryMock";
import tryProxy from "../middlewares/tryProxy";
import validateResponse from "../middlewares/validateResponse";
import { OperationObject } from "../types/openApi";
import setProxyHeaders from "../middlewares/setProxyHeaders";

export default (
  method: string,
  route: string,
  operationSpec: OperationObject
): RequestHandler[] => {
  const middlewares = [
    setProxyHeaders(),
    tryMock(method, route),
    tryProxy(method, route)
  ];

  if (!SKIP_VALIDATION) {
    middlewares.push(validateResponse(operationSpec));
  }

  return middlewares;
};
