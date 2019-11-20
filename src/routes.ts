import express, { Router } from "express";
import { OpenAPI } from "openapi-types";
import openApiVersion from "./lib/openApiVersion";
import Version from "./types/openApiVersion";
import buildV2Routes from "./routes/v2";
import buildV3Routes from "./routes/v3";
import { get } from "lodash";

export const operations = {
  get: "get",
  put: "put",
  post: "post",
  del: "delete",
  delete: "delete",
  options: "options",
  head: "head",
  patch: "patch"
};

export default (spec: OpenAPI.Document): Router => {
  const router = express.Router();
  const version = openApiVersion(spec);
  const paths = get(spec, "paths", {});

  switch (version) {
    case Version.v2:
      // per api V2
      // const host = get(spec, "host",""); // TODO: da gestire
      // const schemes = get(spec, "schemes", ""); // TODO: da gestire
      const basePath = get(spec, "basePath", "");
      return buildV2Routes(router, paths, basePath);
    case Version.v3:
      // per api V3
      const servers = get(spec, "servers", []);
      return buildV3Routes(router, paths, servers);
  }
  throw new Error("Unsupported openApi version");
};
