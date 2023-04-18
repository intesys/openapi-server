import { Router } from "express";
import { OpenAPI, OpenAPIV2 } from "openapi-types";
export declare const getV2BasePath: (spec: OpenAPI.Document) => string;
declare const buildV2Routes: (router: Router, paths: OpenAPIV2.PathsObject, basePath: string) => Router;
export default buildV2Routes;
