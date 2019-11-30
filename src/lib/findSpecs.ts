import glob from "glob";
import Path from "path";

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
export const findSpecs = (strings: string): string[] =>
  strings
    .split(",")
    .map(source => {
      if (
        source.toLowerCase().endsWith(".yml") ||
        source.toLowerCase().endsWith(".yaml")
      ) {
        return glob.sync(Path.join(process.cwd(), source.trim()));
      }

      const _source = `${source.trim()}/**/*.+(yml|yaml)`;
      return glob.sync(Path.join(process.cwd(), _source));
    })
    .reduce((strings, stringArray) => {
      return strings.concat(stringArray);
    }, []);
