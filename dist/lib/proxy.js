"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteError = exports.proxyLibinstance = void 0;
const config_1 = require("../config");
const globals_1 = require("./globals");
const log_1 = require("./log");
const proxyLibs_1 = require("./proxyLibs");
const utils_1 = require("./proxyLibs/utils");
exports.proxyLibinstance = proxyLibs_1.proxyLibs[config_1.proxyLib];
class RemoteError {
    constructor(source, error) {
        this._remote = true;
        this.source = source;
        this.error = error;
    }
}
exports.RemoteError = RemoteError;
/**
 * @param {string} url fully qualified url
 */
exports.default = (url) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fullUrl = `${url}${req.url}`;
        const method = req.method.toLowerCase();
        const headers = globals_1.PROXY_FILTER_HEADERS ? (0, utils_1.filterHeaders)(req.headers) : req.headers;
        const response = yield (0, exports.proxyLibinstance)(method, fullUrl, headers)(req, res);
        const responseHeaders = globals_1.PROXY_FILTER_HEADERS ? (0, utils_1.filterHeaders)(response.headers) : response.headers;
        res.set(responseHeaders);
        res.set("Forwarded", `for=${url}`);
        res.status(response.status);
        res.locals.body = response.data;
        if (response.status >= 400 && !response.data) {
            // avoid to pass to next middleware
            res.locals.body = "";
        }
        (0, log_1.log)({
            "Request handler": "Proxy",
            "Request forwarded to": `${method.toUpperCase()} ${fullUrl} ${globals_1.PROXY_FILTER_HEADERS ? "(filtered headers)" : ""}`,
            "Request headers": headers,
            "Request body": req.body,
            "Response status": response.status,
            "Response headers": responseHeaders,
            "Response body": response.data,
        });
        next();
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=proxy.js.map