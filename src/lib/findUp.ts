import { isString } from 'lodash';
import path from 'path';
import fs from 'fs';

/**
 * Looks for @param file in upper folders, starting fropm startDir
 * Returns the full path of file, if found
 */
export default (files: string | string[], startDir = __dirname): string | undefined => {
  const dir = path.resolve(startDir);
  const { root } = path.parse(dir);
  if (isString(files)) {
    return findFiles([files], dir, root);
  }
  return findFiles(files, dir, root);
}

const findFiles = (files: string[], dir: string, root: string): string | undefined => {
  if (dir === root) {
    return;
  }

  const file = files.find((file: string): boolean => {
    const filePath = path.join(dir, file);
    try {
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        return true;
      }
      if (stat.isDirectory()) {
        return true;
      }
    } catch (err) {
      return false;
    }
    return false;
  });

  if (file) {
    return path.join(dir, file);
  }

  const upperPath = path.join(dir, '..');
  return findFiles(files, upperPath, root);
}
