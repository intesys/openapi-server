import { get } from "lodash";
import { OpenAPI } from "openapi-types";
import { getV2BasePath } from "../routes/v2";
import { getV3BasePath } from "../routes/v3";
import Version from "../types/openApiVersion";
import openApiVersion from "./openApiVersion";

const getBasePath = (spec: OpenAPI.Document): string => {
  const version = openApiVersion(spec);
  switch (version) {
    case Version.v2:
      return getV2BasePath(spec);
    case Version.v3:
      return getV3BasePath(spec);
  }
};

const getFullPaths = (spec: OpenAPI.Document): string[] => {
  const basePath = getBasePath(spec);
  const paths = get(spec, "paths", {});
  return Object.keys(paths)
    .map(path => {
      const methods = Object.keys(paths[path]);
      return methods.map(method => `${basePath}${path}/${method}`);
    })
    .reduce((paths, specPaths) => paths.concat(specPaths), []);
};

const findDuplicates = (arr: string[]) =>
  arr.filter((item, index) => arr.indexOf(item) != index);

const validatePathsOrThrow = (paths: string[]): boolean => {
  const duplicates = findDuplicates(paths);
  if (duplicates.length) {
    throw new Error(
      `Duplicate routes found: ${duplicates.join(
        ",\n"
      )}.\nRoutes should be unique, please remove doubles.`
    );
  }
  return true;
};

export const validateSpecsOrThrow = (specs: OpenAPI.Document[]): boolean => {
  const paths = specs
    .map(spec => getFullPaths(spec))
    .reduce((paths, spec) => paths.concat(spec), []);
  return validatePathsOrThrow(paths);
};
