import fs from "fs";
import Path from "path";
import { isString } from "util";

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
