"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyLibs = void 0;
const axios_1 = __importDefault(require("./axios"));
const postmanRequest_1 = __importDefault(require("./postmanRequest"));
const nodeFetch_1 = __importDefault(require("./nodeFetch"));
exports.proxyLibs = {
    [0 /* PROXY_LIBS.AXIOS */]: axios_1.default,
    [1 /* PROXY_LIBS.POSTMAN_REQUEST */]: postmanRequest_1.default,
    [2 /* PROXY_LIBS.NODE_FETCH */]: nodeFetch_1.default,
};
//# sourceMappingURL=index.js.map