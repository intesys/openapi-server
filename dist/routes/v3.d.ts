/**
 * By design this lib takes only the first server
 * and uses it's path to prefix routes.
 *
 * If proxy is enabled, proxy configuration is used
 * instead of server described in spec.
 */
import { Router } from "express";
import { OpenAPI, OpenAPIV3 } from "openapi-types";
export declare const getV3BasePath: (spec: OpenAPI.Document) => string;
declare const buildV3Routes: (router: Router, paths: Record<string, OpenAPIV3.PathItemObject>, basePath: string) => Router;
export default buildV3Routes;
