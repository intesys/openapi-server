import Ajv from "ajv";
import { SchemaObject } from "../types/openApi";

export default (schema: SchemaObject, data: unknown): boolean => {
  const ajv = new Ajv({
    // format: false, // don't validate by format
    unknownFormats: "ignore", // as example, ignores int64
    allErrors: true,
    nullable: true,
  });
  const valid = ajv.validate(schema, data) as boolean;
  if (!valid) {
    const err = new Error(JSON.stringify(ajv.errors, null, 2));
    throw err;
  }
  return valid;
};
