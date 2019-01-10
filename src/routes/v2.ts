import { Router, RequestHandler } from 'express';
import { OpenAPIV2 } from 'openapi-types';
import toExpressParam from '../lib/toExpressParam';
import { operations } from '../routes';
import getMiddlewares from './middlewares';

const buildV2Routes = (router: Router, paths: OpenAPIV2.PathsObject): Router => {
  Object.keys(paths).forEach((route: string) => {
    const expressRoute = toExpressParam(route);
    const routerRef = router.route(expressRoute);
    const methods = Object.keys(operations);
    const spec: OpenAPIV2.PathItemObject = paths[route];
    methods.forEach(_method => {
      const method = operations[_method];
      const operationSpec: OpenAPIV2.OperationObject = spec[method];
      const middlewares: RequestHandler[] = getMiddlewares(method, route, operationSpec);
      routerRef[method](middlewares);
    })
  })
  return router;
}

export default buildV2Routes;
