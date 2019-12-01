import { RequestHandler, Router } from "express";
import { OpenAPIV2, OpenAPI } from "openapi-types";
import toExpressParam from "../lib/toExpressParam";
import { operations } from "../routes";
import getMiddlewares from "./middlewares";
import { get } from "lodash";

export const getV2BasePath = (spec: OpenAPI.Document): string =>
  get(spec, "basePath", "");

const buildV2Routes = (
  router: Router,
  paths: OpenAPIV2.PathsObject,
  basePath: string
): Router => {
  Object.keys(paths).forEach((route: string) => {
    const fullRoute = basePath + route;
    const expressRoute = toExpressParam(fullRoute);
    const routerRef = router.route(expressRoute);
    const methods = Object.keys(operations);
    const spec: OpenAPIV2.PathItemObject = paths[route];
    methods.forEach(_method => {
      const method = operations[_method];
      const operationSpec: OpenAPIV2.OperationObject = spec[method];
      const middlewares: RequestHandler[] = getMiddlewares(
        method,
        fullRoute,
        operationSpec
      );
      routerRef[method](middlewares);
    });
  });
  return router;
};

export default buildV2Routes;
