"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const openapi_schema_validator_1 = __importDefault(require("openapi-schema-validator"));
const log_1 = require("./log");
const openApiVersion_1 = __importDefault(require("./openApiVersion"));
/**
 * @param {OpenApi.Document} spec
 */
exports.default = (spec) => {
    const version = openApiVersion_1.default(spec);
    const title = lodash_1.get(spec, "info.title") || "";
    const validator = new openapi_schema_validator_1.default({ version });
    const validation = validator.validate(spec);
    if (validation.errors.length) {
        const error = JSON.stringify(validation.errors, null, 2);
        throw new Error(`Invalid openApi schema ${title}: ${error}`);
    }
    log_1.print(`Valid openApi schema ${title}`);
    return true;
};
//# sourceMappingURL=openApiSchemaValidate.js.map