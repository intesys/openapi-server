import { SKIP_VALIDATION, MOCKS, PROXY, DELAY } from "../lib/globals";
import { RequestHandler } from "express";
import tryMock from "../middlewares/tryMock";
import tryProxy from "../middlewares/tryProxy";
import validateResponse from "../middlewares/validateResponse";
import { OperationObject } from "../types/openApi";
import setProxyHeaders from "../middlewares/setProxyHeaders";
import addDelay from "../middlewares/addDelay";

export default (method: string, route: string, operationSpec: OperationObject): RequestHandler[] => {
  const middlewares = [setProxyHeaders()];

  DELAY && middlewares.push(addDelay());
  MOCKS && middlewares.push(tryMock(method, route));
  PROXY && middlewares.push(tryProxy(method, route));
  !SKIP_VALIDATION && middlewares.push(validateResponse(operationSpec));

  return middlewares;
};
