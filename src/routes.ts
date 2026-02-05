import express, { Router } from "express";
import { get } from "lodash";
import { OpenAPI, OpenAPIV2, OpenAPIV3 } from "openapi-types";
import openApiVersion from "./lib/openApiVersion";
import buildV2Routes, { getV2BasePath } from "./routes/v2";
import buildV3Routes, { getV3BasePath } from "./routes/v3";
import Version from "./types/openApiVersion";

export const operations: Record<string, string> = {
  get: "get",
  put: "put",
  post: "post",
  del: "delete",
  delete: "delete",
  options: "options",
  head: "head",
  patch: "patch",
};

export default (spec: OpenAPI.Document): Router => {
  const router = express.Router();
  const version = openApiVersion(spec);
  const paths = get(spec, "paths", {});

  switch (version) {
    case Version.v2:
      return buildV2Routes(router, paths as OpenAPIV2.PathsObject, getV2BasePath(spec));
    case Version.v3:
      return buildV3Routes(router, paths as Record<string, OpenAPIV3.PathItemObject>, getV3BasePath(spec));
    default:
      throw new Error("Unsupported openApi version");
  }
};
