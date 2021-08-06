"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const joinUrl = (...parts) => path_1.default.posix.join(...parts);
exports.default = joinUrl;
//# sourceMappingURL=joinUrl.js.map