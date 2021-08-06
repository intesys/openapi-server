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
const proxy_1 = require("../proxy");
const request = require("postman-request");
const addBody = (method, contentType, body, defaults) => {
    const allowedMethods = ["PATCH", "POST", "PUT"];
    const _method = method.toLowerCase();
    if (allowedMethods.indexOf(_method) < 0) {
        // only allowedMethods can have body
        return defaults;
    }
    if (!body) {
        // avoid empty body
        return defaults;
    }
    switch (contentType) {
        case contentType.includes("application/json") && contentType:
            return Object.assign(Object.assign({}, defaults), { body: JSON.stringify(body) });
        case "text/plain":
        case "application/x-www-form-urlencoded":
        case "multipart/form-data":
        case "multipart/related":
        default:
            return Object.assign(Object.assign({}, defaults), { body: body });
    }
};
const PostmanRequestLib = (method, url, headers = {}) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let options = {};
    try {
        const contentType = req.headers["content-type"] || "text/plain";
        const defaults = {
            method,
            headers,
            url,
            followRedirect: false,
            gzip: true,
            strictSSL: false,
        };
        options = addBody(method, contentType, req.body, defaults);
    }
    catch (err) {
        return Promise.reject(err);
    }
    return new Promise((resolve, reject) => {
        request(options, (error, response, data) => {
            if (error) {
                return reject(new proxy_1.RemoteError(`${method} ${url}`, error));
            }
            const headers = response.headers;
            const status = response.statusCode || 0;
            resolve({ data, headers, status });
        });
    });
});
exports.default = PostmanRequestLib;
//# sourceMappingURL=postmanRequest.js.map