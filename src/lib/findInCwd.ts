import Path from "path";
import fs from "fs";

/**
 * Searches for files in current working directory, returns the first file found.
 * String returned is the full file path
 *
 * @param files string[]
 * @returns string | undefined full path to file
 */
const findInCwd = (files: string[]): string | undefined => {
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

export default findInCwd;
