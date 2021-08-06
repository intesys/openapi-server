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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const globals_1 = require("./lib/globals");
const log_1 = require("./lib/log");
const isAsyncFunction = (fn) => fn[Symbol.toStringTag] === "AsyncFunction";
const isFile = (routerFile) => {
    try {
        const stat = fs_1.default.statSync(routerFile);
        if (stat.isFile()) {
            return true;
        }
        return false;
    }
    catch (e) {
        return false;
    }
};
exports.default = (middleware) => __awaiter(void 0, void 0, void 0, function* () {
    const router = express_1.default.Router();
    const routerFile = path_1.default.join(globals_1.MOCKS_PATH, config_1.CUSTOM_MIDDLEWARES_PATH, config_1.CUSTOM_MIDDLEWARES_NAMES[middleware]);
    if (isFile(routerFile)) {
        log_1.print(`Using custom middleware: ${routerFile}`);
        const customRouter = require(routerFile);
        if (isAsyncFunction(customRouter)) {
            const awaitedCustomRouter = yield customRouter();
            router.use(awaitedCustomRouter);
        }
        else {
            router.use(customRouter);
        }
    }
    return router;
});
//# sourceMappingURL=customMiddleware.js.map