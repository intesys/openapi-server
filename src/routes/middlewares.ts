import { SKIP_VALIDATION } from '../lib/globals';
import { RequestHandler } from 'express';
import tryMock from '../middlewares/tryMock';
import tryProxy from '../middlewares/tryProxy';
import validateResponse from '../middlewares/validateResponse';
import { OperationObject } from '../types/openApi';

export default (method: string, route: string, operationSpec: OperationObject): RequestHandler[] => {
  const middlewares = [
    tryMock(method, route),
    tryProxy(method, route)
  ];

  if (!SKIP_VALIDATION) {
    middlewares.push(validateResponse(operationSpec));
  }

  return middlewares;
}
