import { OperationObject } from "types/openApi";
import { RequestHandler } from "express";
import { mock } from "mock-json-schema";
import { get, set } from "lodash";
import voidMiddleware from "./void";
import { log } from "../lib/log";

const tryAutoMock = (
  method: string,
  operationSpec: OperationObject
): RequestHandler => (req, res, next) => {
  if (get(res, "locals.body")) {
    return voidMiddleware(req, res, next);
  }

  const responsesSchema = get(operationSpec, "responses");
  if (!responsesSchema) {
    return voidMiddleware(req, res, next);
  }

  const responseSpec = responsesSchema["200"] || responsesSchema[0];
  const responseSchema = get(responseSpec, "content.application/json.schema");
  if (!responseSchema) {
    return voidMiddleware(req, res, next);
  }

  const _mock = mock(responseSchema);
  set(res, "locals.body", _mock);
  log({
    "Mocking request from example": req.originalUrl,
    Method: method.toUpperCase(),
    Response: _mock
  });

  return next();
};

export default tryAutoMock;
