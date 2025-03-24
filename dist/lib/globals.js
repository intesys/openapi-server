"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyUrl = exports.WATCH = exports.VERBOSE = exports.LOG = exports.SKIP_VALIDATION = exports.PROXY_FILTER_HEADERS = exports.PROXY_PREFIX = exports.PROXY_PORT = exports.PROXY_HOSTNAME = exports.PROXY_PROTOCOL = exports.PROXY = exports.MOCKS_PATH = exports.MOCKS = exports.STATIC_PATH = exports.STATIC_PREFIX = exports.STATIC = exports.API_HOSTNAME = exports.API_PROTOCOL = exports.API_PORT = exports.API_PREFIX = exports.API_YML = exports.specs = void 0;
const lodash_1 = require("lodash");
const config_1 = require("../config");
const findInCwd_1 = require("./findInCwd");
const findSpecs_1 = require("./findSpecs");
const getPort_1 = __importDefault(require("./getPort"));
const getPrefix_1 = __importDefault(require("./getPrefix"));
const toBoolean_1 = require("./toBoolean");
require("./env");
const env = lodash_1.pick(process.env, config_1.options);
const globals = toBoolean_1.fixBooleans(Object.assign(Object.assign({}, config_1.defaults), env), config_1.booleans);
const exitWithError = (message, code = 1) => {
    const err = new Error(message);
    console.error(err);
    throw err;
};
// Absolutize MOCKS_PATH
globals.MOCKS_PATH =
    findInCwd_1.findDirInCwd(globals.MOCKS_PATH || "/") ||
        exitWithError(`Mock directory not found: ${globals.MOCKS_PATH}, please set MOCKS_PATH`);
// Absolutize API_YML path
exports.specs = findSpecs_1.findSpecs(globals.API_YML) || exitWithError(`Invalid API_YML: ${globals.API_YML}`);
const { API_YML, API_PREFIX, API_PORT, API_PROTOCOL, API_HOSTNAME, STATIC, STATIC_PREFIX, STATIC_PATH, MOCKS, MOCKS_PATH, PROXY, PROXY_PROTOCOL, PROXY_HOSTNAME, PROXY_PORT, PROXY_PREFIX, PROXY_FILTER_HEADERS, SKIP_VALIDATION, LOG, VERBOSE, WATCH, } = globals;
exports.API_YML = API_YML;
exports.API_PREFIX = API_PREFIX;
exports.API_PORT = API_PORT;
exports.API_PROTOCOL = API_PROTOCOL;
exports.API_HOSTNAME = API_HOSTNAME;
exports.STATIC = STATIC;
exports.STATIC_PREFIX = STATIC_PREFIX;
exports.STATIC_PATH = STATIC_PATH;
exports.MOCKS = MOCKS;
exports.MOCKS_PATH = MOCKS_PATH;
exports.PROXY = PROXY;
exports.PROXY_PROTOCOL = PROXY_PROTOCOL;
exports.PROXY_HOSTNAME = PROXY_HOSTNAME;
exports.PROXY_PORT = PROXY_PORT;
exports.PROXY_PREFIX = PROXY_PREFIX;
exports.PROXY_FILTER_HEADERS = PROXY_FILTER_HEADERS;
exports.SKIP_VALIDATION = SKIP_VALIDATION;
exports.LOG = LOG;
exports.VERBOSE = VERBOSE;
exports.WATCH = WATCH;
const port = getPort_1.default(PROXY_PORT);
const prefix = getPrefix_1.default(PROXY_PREFIX);
exports.proxyUrl = `${PROXY_PROTOCOL}://${PROXY_HOSTNAME}${port}${prefix}`;
//# sourceMappingURL=globals.js.map