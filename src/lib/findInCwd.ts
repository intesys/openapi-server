import fs from "fs";
import Path from "path";
import { isString } from "util";
import { ISourceYml } from "../types/env";

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
      const path = Path.join(process.cwd(), file);
      const stat = fs.statSync(path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  });

  if (file) {
    return Path.join(process.cwd(), file);
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

export const getApiYmlParams = (param: any): ISourceYml[] => {
  const tempSources = param.split(",").filter(Boolean);
  const sources = tempSources.map((item: string) => {
    const isFile = findFileInCwd(item);
    const isDirectory = findDirInCwd(item);
    if (!(isFile || isDirectory)) {
      throw new Error(`Invalid path or file: ${item}`);
    }
    return { type: isFile ? "file" : "directory", path: item };
  });

  return sources;
};
