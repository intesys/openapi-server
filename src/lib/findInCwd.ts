import Path from "path";
import fs from "fs";

/**
 * Searches for files in current working diractory, returns the first file found.
 * String returned is the full file path
 *
 * @param files string[]
 * @returns string | undefined full path to found file
 */
const findInCwd = (files: string[]): string | undefined =>
  files.find(file => {
    try {
      const path = Path.join(process.cwd(), file);
      const stat = fs.statSync(path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  });

export default findInCwd;
