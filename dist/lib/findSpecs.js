"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSpecs = void 0;
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
/**
 * Splits a list of comma separated strings and
 * finds yaml files.
 * If a list element is a *.yml or *.yaml file, returns its absolute path,
 * otherwise expects a directory (without trailing slash) and returns an array
 * of yaml files contained.
 *
 * Example:
 * API_YML='/example/api.yml,/examples/api'
 * returns
 * [
 *  '/abs/path/to/example/api.yml',
 *  '/abs/path/to/example/api/spec.yaml',
 *  '/abs/path/to/example/api/subdirectory/spec.yml',
 * ]
 *
 * @param strings
 */
const findSpecs = (strings) => strings
    .split(",")
    .map(source => {
    if (source.toLowerCase().endsWith(".yml") || source.toLowerCase().endsWith(".yaml")) {
        return glob_1.default.sync(path_1.default.join(process.cwd(), source.trim()));
    }
    const _source = `${source.trim()}/**/*.+(yml|yaml)`;
    return glob_1.default.sync(path_1.default.join(process.cwd(), _source));
})
    .reduce((strings, stringArray) => {
    return strings.concat(stringArray);
}, []);
exports.findSpecs = findSpecs;
//# sourceMappingURL=findSpecs.js.map