"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDirInCwd = exports.findFileInCwd = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Searches for files in current working directory, returns the first file found.
 * String returned is the full file path
 *
 * @param files string[]
 * @returns string | undefined full path to file
 */
const findFileInCwd = (files) => {
    if (typeof files === "string") {
        files = [files];
    }
    const file = files.find(file => {
        try {
            const path = path_1.default.join(process.cwd(), file);
            const stat = fs_1.default.statSync(path);
            return stat.isFile();
        }
        catch (e) {
            return false;
        }
    });
    if (file) {
        return path_1.default.join(process.cwd(), file);
    }
    return;
};
exports.findFileInCwd = findFileInCwd;
const findDirInCwd = (dir) => {
    try {
        const path = path_1.default.join(process.cwd(), dir);
        const stat = fs_1.default.statSync(path);
        if (stat.isDirectory()) {
            return path;
        }
        throw new Error(`Directory not found: ${path}`);
    }
    catch (err) {
        return;
    }
};
exports.findDirInCwd = findDirInCwd;
//# sourceMappingURL=findInCwd.js.map