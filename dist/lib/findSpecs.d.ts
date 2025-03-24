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
export declare const findSpecs: (strings: string) => string[];
