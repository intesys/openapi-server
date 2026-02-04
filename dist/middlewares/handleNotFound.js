"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../lib/globals");
const log_1 = require("../lib/log");
exports.default = () => (req, res, next) => {
    const messages = [];
    (0, log_1.log)(req.url);
    globals_1.MOCKS && messages.push(`- Mock not found in: ${globals_1.MOCKS_PATH}`);
    globals_1.PROXY && messages.push(`- Remote host called: ${globals_1.proxyUrl}`);
    const notFoundMessage = `Uri ${req.url} not found \n${messages.join("\n")}`;
    res.status(404).send(notFoundMessage);
};
//# sourceMappingURL=handleNotFound.js.map