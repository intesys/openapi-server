/**
 * Validates the response, based on api.yml
 *
 * Api.yml is transformed in `req.swagger` by swagger-express-middleware metadata().
 * Response schema is provided by `req.swagger` and validated by Ajv (a popular JSONschema validaor)
 *
 * References:
 * - OpenAPI v.2.0 (Swagger 2.0): https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md
 * - OpenAPI v.3.0.2: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md
 * - Ajv: https://ajv.js.org
 * - JsonSchema: http://json-schema.org/
 */
import { get } from "lodash";
import validate from "../lib/validate";
import { RequestHandler } from "express";
import { OperationObject, ResponsesObject } from "../types/openApi";

export default (spec: OperationObject): RequestHandler => (req, res, next) => {
  const code = res.statusCode || 200;
  const format = res.get("Content-Type") || "application/json";
  const schema = getResponseSchema(spec, code, format);
  try {
    validate(schema, res.locals.body);
    next();
  } catch (err) {
    const message = `invalid response: ${err.message}`;
    next(new Error(message));
  }
};

const getResponseSchema = (
  spec: OperationObject,
  code: number,
  format: string
): ResponsesObject => {
  return (
    get(spec, `responses.${code}.schema`) || // swagger v.2
    get(spec, `responses.default.schema`) || // swagger v.2
    get(spec, `responses.${code}.content.${format}.schema`) || // openapi v.3.0.*
    get(spec, `responses.default.content.${format}.schema`)
  ); // openapi v.3.0.*
};
