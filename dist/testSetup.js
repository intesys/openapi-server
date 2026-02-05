"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Polyfill TextEncoder/TextDecoder for Jest when not provided by Node runtime
const util_1 = require("util");
if (typeof global.TextEncoder === "undefined") {
    global.TextEncoder = util_1.TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
    global.TextDecoder = util_1.TextDecoder;
}
//# sourceMappingURL=testSetup.js.map