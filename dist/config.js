"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyLib = exports.booleans = exports.options = exports.defaults = exports.CUSTOM_MIDDLEWARES_NAMES = exports.CUSTOM_MIDDLEWARES_PATH = void 0;
const lodash_1 = require("lodash");
exports.CUSTOM_MIDDLEWARES_PATH = "__middlewares__";
exports.CUSTOM_MIDDLEWARES_NAMES = {
    [0 /* CUSTOM_MIDDLEWARES.PRE */]: "pre.js",
    [1 /* CUSTOM_MIDDLEWARES.POST */]: "post.js",
};
exports.defaults = {
    API_YML: "",
    API_PREFIX: "",
    API_PORT: "3000",
    API_PROTOCOL: "http",
    API_HOSTNAME: "localhost",
    STATIC: false,
    STATIC_PREFIX: "/static",
    STATIC_PATH: "/static",
    MOCKS: true,
    MOCKS_PATH: "/mocks",
    PROXY: false,
    PROXY_PROTOCOL: "http",
    PROXY_HOSTNAME: "",
    PROXY_PORT: "",
    PROXY_PREFIX: "",
    PROXY_FILTER_HEADERS: false,
    SKIP_VALIDATION: false,
    LOG: false,
    VERBOSE: 2,
    WATCH: false,
};
// list of config keys
exports.options = Object.keys(exports.defaults);
// boolean config values
exports.booleans = exports.options.filter(key => (0, lodash_1.isBoolean)(exports.defaults[key]));
// proxy library in use, can be axios, postman-request, nodeFetch
exports.proxyLib = 0 /* PROXY_LIBS.AXIOS */;
//# sourceMappingURL=config.js.map