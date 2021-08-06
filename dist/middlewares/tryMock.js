"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const void_1 = __importDefault(require("./void"));
const lodash_1 = require("lodash");
const globals_1 = require("../lib/globals");
const log_1 = require("../lib/log");
const invalidateRequireCache = (name) => {
    try {
        const key = require.resolve(name);
        if (Boolean(require.cache[key])) {
            delete require.cache[key];
        }
    }
    catch (e) { }
};
const isFunction = (value) => typeof value === "function";
const nodeRequireError = (err) => {
    const message = err.message.toLowerCase();
    return message.includes("cannot find module") || message.includes("enoent");
};
/**
 * @param method one value of `operations`
 * @param route path key, as example: '/item/{id}'
 */
const tryMock = (method, route) => (req, res, next) => {
    if (!lodash_1.isUndefined(lodash_1.get(res, "locals.body"))) {
        return void_1.default(req, res, next);
    }
    const mockPath = path_1.default.join(globals_1.MOCKS_PATH, route, method);
    try {
        if (globals_1.WATCH) {
            invalidateRequireCache(mockPath);
        }
        const mock = require(mockPath);
        if (isFunction(mock)) {
            log_1.log({
                "Request handler": "Mock (middleware)",
                "Request uri": `${method.toUpperCase()} ${req.originalUrl}`,
                "Handled by": mockPath,
            });
            return mock(req, res, next);
        }
        lodash_1.set(res, "locals.body", mock);
        log_1.log({
            "Request handler": "Mock (json)",
            "Request uri": `${method.toUpperCase()} ${req.originalUrl}`,
            "Handled by": mockPath,
        });
    }
    catch (err) {
        const error = new Error(err);
        if (!nodeRequireError(error)) {
            return next(error);
        }
        log_1.log(`\n${method.toUpperCase()} ${route} is not mocked\n To mock it, touch ${mockPath}.js(on)`);
    }
    return next();
};
exports.default = tryMock;
//# sourceMappingURL=tryMock.js.map