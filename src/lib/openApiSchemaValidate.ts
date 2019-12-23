import { get } from "lodash";
import OpenAPISchemaValidator from "openapi-schema-validator";
import { OpenAPI } from "openapi-types";
import { print } from "./log";
import openApiVersion from "./openApiVersion";

/**
 * @param {OpenApi.Document} spec
 */
export default (spec: OpenAPI.Document): boolean => {
  const version = openApiVersion(spec);
  const title = get(spec, "info.title") || "";
  const validator = new OpenAPISchemaValidator({ version });

  const validation = validator.validate(spec);

  if (validation.errors.length) {
    const error = JSON.stringify(validation.errors, null, 2);
    throw new Error(`Invalid openApi schema ${title}: ${error}`);
  }

  print(`Valid openApi schema ${title}`);
  return true;
};
