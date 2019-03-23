import { SKIP_VALIDATION, AUTO_MOCK } from "../lib/globals";
import { RequestHandler } from "express";
import tryMock from "../middlewares/tryMock";
import tryProxy from "../middlewares/tryProxy";
import validateResponse from "../middlewares/validateResponse";
import { OperationObject } from "../types/openApi";
import tryAutoMock from "../middlewares/tryAutoMock";

export default (
  method: string,
  route: string,
  operationSpec: OperationObject
): RequestHandler[] => {
  const middlewares = [tryMock(method, route), tryProxy(method, route)];

  if (AUTO_MOCK) {
    // auto mocks must be executed between mocks and proxy
    middlewares.splice(1, 0, tryAutoMock(method, operationSpec));
  }

  if (!SKIP_VALIDATION) {
    middlewares.push(validateResponse(operationSpec));
  }

  return middlewares;
};
