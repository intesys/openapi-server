"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSpecsOrThrow = void 0;
const lodash_1 = require("lodash");
const routes_1 = require("../routes");
const v2_1 = require("../routes/v2");
const v3_1 = require("../routes/v3");
const openApiVersion_1 = __importDefault(require("./openApiVersion"));
const getBasePath = (spec) => {
    const version = (0, openApiVersion_1.default)(spec);
    switch (version) {
        case 0 /* Version.v2 */:
            return (0, v2_1.getV2BasePath)(spec);
        case 1 /* Version.v3 */:
            return (0, v3_1.getV3BasePath)(spec);
    }
};
const getFullPaths = (spec) => {
    const basePath = getBasePath(spec);
    const paths = (0, lodash_1.get)(spec, "paths", {});
    const operationMethods = Object.values(routes_1.operations);
    return Object.keys(paths)
        .map((path) => Object.keys(paths[path] || {})
        // only valid http methods are evaluated
        .filter((method) => operationMethods.indexOf(method) > -1)
        .map((method) => `${basePath}${path}/${method}`))
        .reduce((paths, specPaths) => paths.concat(specPaths), []);
};
const findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) != index);
const validatePathsOrThrow = (paths) => {
    const duplicates = findDuplicates(paths);
    if (duplicates.length) {
        throw new Error(`Duplicate routes found: ${duplicates.join(",\n")}.\nRoutes should be unique, please remove doubles.`);
    }
    return true;
};
const validateSpecsOrThrow = (specs) => {
    const paths = specs.map((spec) => getFullPaths(spec)).reduce((paths, spec) => paths.concat(spec), []);
    return validatePathsOrThrow(paths);
};
exports.validateSpecsOrThrow = validateSpecsOrThrow;
//# sourceMappingURL=validatePaths.js.map