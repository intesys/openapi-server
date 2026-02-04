"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const version = require(path_1.default.join(__dirname, "../package.json")).version;
commander_1.default
    .version(version, "-v, --version")
    .allowUnknownOption()
    .option("-a,--API_YML [value]", "api yml file / folder / list of file or folders")
    .option("-m,--MOCKS_PATH [value]", "mocks path")
    .option("-l,--LOG", "enable console log")
    .option("-s,--SKIP_VALIDATION", "turn off validation")
    .option("-w,--WATCH", "restart the server on changes")
    .option("--API_PREFIX [value]")
    .option("--API_PORT [value]")
    .option("--API_PROTOCOL [value]")
    .option("--API_HOSTNAME [value]")
    .option("--STATIC", "enable static resources")
    .option("--STATIC_PREFIX [value]")
    .option("--STATIC_PATH [value]")
    .option("--PROXY", "enable proxy")
    .option("--PROXY_PROTOCOL [value]")
    .option("--PROXY_HOSTNAME [value]")
    .option("--PROXY_PORT [value]")
    .option("--PROXY_PREFIX [value]")
    .option("--PROXY_FILTER_HEADERS", "remove some headers, details in doc")
    .option("--VERBOSE [number]", "depth of logs shown")
    .parse(process.argv);
const cliOptions = (0, lodash_1.pick)(commander_1.default.opts(), config_1.options);
// overwrite env variables
Object.keys(cliOptions).forEach(key => (process.env[key] = cliOptions[key]));
require("./app").default();
//# sourceMappingURL=cli.js.map