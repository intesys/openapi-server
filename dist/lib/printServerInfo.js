"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
const log_1 = require("./log");
exports.default = () => {
    (0, log_1.clear)();
    (0, log_1.print)(`
  Openapi server running at ${globals_1.API_PROTOCOL}://localhost:${globals_1.API_PORT}

  Api yml: ${globals_1.API_YML}
  Api prefix: ${globals_1.API_PREFIX}
  Mock path: ${globals_1.MOCKS_PATH}
  Proxy is ${globals_1.PROXY ? "enabled" : "disabled"}${globals_1.PROXY
        ? `
  Proxy URL: ${globals_1.proxyUrl}`
        : ``}    
  Static files are ${globals_1.STATIC ? "enabled" : "disabled"}${globals_1.STATIC
        ? `
  Static prefix: ${globals_1.STATIC_PREFIX}
  Static path: ${globals_1.STATIC_PATH}`
        : ``}  
  Validation is ${globals_1.SKIP_VALIDATION ? "disabled" : "enabled"}
  Log is ${globals_1.LOG ? "enabled" : "disabled"}
  Watch mode is ${globals_1.WATCH ? "enabled" : "disabled"}
`);
};
//# sourceMappingURL=printServerInfo.js.map