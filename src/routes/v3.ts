import { RequestHandler, Router } from "express";
import { get } from "lodash";
import { OpenAPIV3 } from "openapi-types";
import toExpressParam from "../lib/toExpressParam";
import { operations } from "../routes";
import getMiddlewares from "./middlewares";

const buildV3Routes = (
  router: Router,
  paths: Record<string, OpenAPIV3.PathItemObject>,
  servers: OpenAPIV3.ServerObject[]
): Router => {
  const getServerUrlWithoutPlaceholder = (
    servers: OpenAPIV3.ServerObject[]
  ) => {
    const variables = get(servers[0], "variables");
    const url = get(servers[0], "url");
    if (variables) {
      const mapObj = {};
      Object.keys(variables).map(item => {
        return (mapObj["{" + item + "}"] = variables[item].default);
      });
      var regex = new RegExp("(" + Object.keys(mapObj).join("|") + ")", "gi");
      const newUrl = url.replace(regex, function(matched) {
        return mapObj[matched];
      });
      return newUrl;
    }
    return url;
  };

  const getRoute = (route: string, servers: OpenAPIV3.ServerObject[]) => {
    if (servers.length > 0) {
      // TODO: multi url da gestire in futuro
      const url = new URL(getServerUrlWithoutPlaceholder(servers));
      // TODO: "host" e "schemes" da gestire eventualmente in futuro
      // const host = url.host;
      // const schemes = url.protocol.replace(/:/g, "");
      const basePath = url.pathname;
      return basePath + route;
    }
    return route;
  };

  Object.keys(paths).forEach((route: string) => {
    const expressRoute = toExpressParam(getRoute(route, servers));
    const routerRef = router.route(expressRoute);
    const methods = Object.keys(operations);
    const spec: OpenAPIV3.PathItemObject = paths[route];
    methods.forEach(_method => {
      const method = operations[_method];
      const operationSpec: OpenAPIV3.OperationObject = spec[method];
      const middlewares: RequestHandler[] = getMiddlewares(
        method,
        route,
        operationSpec
      );
      routerRef[method](middlewares);
    });
  });
  return router;
};

export default buildV3Routes;
