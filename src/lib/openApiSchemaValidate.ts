
import OpenAPISchemaValidator from 'openapi-schema-validator';
import openApiVersion from './openApiVersion';
import { OpenAPI } from 'openapi-types';
import { log } from './log';

/**
 * @param {OpenApi{}} spec
 * @param {number} version 2 or 3: openapi schema version
 */
export default (spec: OpenAPI.Document): boolean => {
  const version = openApiVersion(spec);
  const validator = new OpenAPISchemaValidator({ version });

  const validation = validator.validate(spec);

  if (validation.errors.length) {
    const error = JSON.stringify(validation.errors, null, 2);
    throw new Error(`Invalid openApi schema: ${error}`);
  }

  log('Valid openApi schema');
  return true;
}
