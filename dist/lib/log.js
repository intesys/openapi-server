"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.log = exports.clear = exports.print = void 0;
const globals_1 = require("./globals");
const util_1 = require("util");
const depth = globals_1.VERBOSE !== true ? globals_1.VERBOSE || 0 : null;
const print = (message) => {
    console.info(stringify(message));
};
exports.print = print;
const clear = () => {
    if (globals_1.LOG) {
        // when log is enabled, show all console messages
        return;
    }
    console.clear();
};
exports.clear = clear;
const log = (message) => {
    if (globals_1.LOG) {
        console.log(stringify(message));
    }
};
exports.log = log;
const error = (message, stack = "") => {
    if (globals_1.LOG) {
        console.error(stringify(message), stack);
    }
};
exports.error = error;
const stringify = (message) => {
    if (typeof message === "string") {
        return message;
    }
    return (0, util_1.inspect)(message, { colors: true, compact: false, breakLength: Infinity, depth });
};
//# sourceMappingURL=log.js.map