import { RequestHandler, Router } from "express";
import { get } from "lodash";
import { OpenAPI, OpenAPIV2 } from "openapi-types";
import joinUrl from "../lib/joinUrl";
import toExpressParam from "../lib/toExpressParam";
import { operations } from "../routes";
import getMiddlewares from "./middlewares";

export const getV2BasePath = (spec: OpenAPI.Document): string => get(spec, "basePath", "") as string;

const buildV2Routes = (router: Router, paths: OpenAPIV2.PathsObject, basePath: string): Router => {
  Object.keys(paths).forEach((route: string) => {
    const fullRoute = joinUrl(basePath, route);
    const expressRoute = toExpressParam(fullRoute);
    const routerRef = router.route(expressRoute);
    const methods = Object.keys(operations);
    const spec: OpenAPIV2.PathItemObject = paths[route];
    methods.forEach((_method) => {
      const method = operations[_method] as keyof OpenAPIV2.PathItemObject;
      const operationSpec = (spec as any)[method] as OpenAPIV2.OperationObject | undefined;
      if (!operationSpec) {
        // skip because method is not defined in spec
        return;
      }
      const middlewares: RequestHandler[] = getMiddlewares(method as string, fullRoute, operationSpec);
      (routerRef as any)[method](middlewares);
    });
  });
  return router;
};

export default buildV2Routes;
