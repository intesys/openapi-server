import fs from "fs";
import glob from "glob";
import Path from "path";
import { isString } from "util";
import { ISourceYml, SourceType } from "../types/env";
import { ROOT_DIR } from "./globals";

/**
 * Searches for files in current working directory, returns the first file found.
 * String returned is the full file path
 *
 * @param files string[]
 * @returns string | undefined full path to file
 */
export const findFileInCwd = (files: string | string[]): string | undefined => {
  if (isString(files)) {
    files = [files];
  }
  const file = files.find(file => {
    try {
      const path = Path.join(ROOT_DIR, file);
      const stat = fs.statSync(path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  });

  if (file) {
    return Path.join(ROOT_DIR, file);
  }
  return;
};

export const findDirInCwd = (dir: string): string | undefined => {
  try {
    const path = Path.join(process.cwd(), dir);
    const stat = fs.statSync(path);
    if (stat.isDirectory()) {
      return path;
    }
    throw new Error(`Directory not found: ${path}`);
  } catch (err) {
    return;
  }
};

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
