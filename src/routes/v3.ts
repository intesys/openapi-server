/**
 * By design this lib takes only the first server
 * and uses it's path to prefix routes.
 *
 * If proxy is enabled, proxy configuration is used
 * instead of server described in spec.
 */

import { RequestHandler, Router } from "express";
import { get } from "lodash";
import { OpenAPIV3 } from "openapi-types";
import toExpressParam from "../lib/toExpressParam";
import { operations } from "../routes";
import getMiddlewares from "./middlewares";

const compileServerVars = (
  url: string,
  variables: {
    [variable: string]: OpenAPIV3.ServerVariableObject;
  }
): string => {
  const mapObj = {};
  Object.keys(variables).map(item => {
    return (mapObj["{" + item + "}"] = variables[item].default);
  });
  var regex = new RegExp("(" + Object.keys(mapObj).join("|") + ")", "gi");
  const newUrl = url.replace(regex, function(matched) {
    return mapObj[matched];
  });
  return newUrl;
};

const getServer = (servers: OpenAPIV3.ServerObject[]): string => {
  const server = servers[0];
  const variables = get(server, "variables");
  const url = get(server, "url");
  if (variables) {
    return compileServerVars(url, variables);
  }
  return url;
};

const getPath = (server: string): string => {
  const url = new URL(server);
  return url.pathname;
};

const buildV3Routes = (
  router: Router,
  paths: Record<string, OpenAPIV3.PathItemObject>,
  servers: OpenAPIV3.ServerObject[]
): Router => {
  const server = getServer(servers);
  const basePath = getPath(server);
  Object.keys(paths).forEach((route: string) => {
    const fullRoute = basePath + route;
    const expressRoute = toExpressParam(fullRoute);
    const routerRef = router.route(expressRoute);
    const methods = Object.keys(operations);
    const spec: OpenAPIV3.PathItemObject = paths[route];
    methods.forEach(_method => {
      const method = operations[_method];
      const operationSpec: OpenAPIV3.OperationObject = spec[method];
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

export default buildV3Routes;
