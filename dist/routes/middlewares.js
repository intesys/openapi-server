"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../lib/globals");
const tryMock_1 = __importDefault(require("../middlewares/tryMock"));
const tryProxy_1 = __importDefault(require("../middlewares/tryProxy"));
const validateResponse_1 = __importDefault(require("../middlewares/validateResponse"));
const setProxyHeaders_1 = __importDefault(require("../middlewares/setProxyHeaders"));
exports.default = (method, route, operationSpec) => {
    const middlewares = [(0, setProxyHeaders_1.default)()];
    globals_1.MOCKS && middlewares.push((0, tryMock_1.default)(method, route));
    globals_1.PROXY && middlewares.push((0, tryProxy_1.default)(method, route));
    !globals_1.SKIP_VALIDATION && middlewares.push((0, validateResponse_1.default)(operationSpec));
    return middlewares;
};
//# sourceMappingURL=middlewares.js.map