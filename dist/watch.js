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
const fs_1 = __importDefault(require("fs"));
const init_1 = __importDefault(require("./init"));
const globals_1 = require("./lib/globals");
const log_1 = require("./lib/log");
/**
 * Restarts the server on file changes
 */
exports.default = (app, server) => {
    let restarting = false;
    let scheduleRestart = false;
    const restart = () => __awaiter(void 0, void 0, void 0, function* () {
        (0, log_1.clear)();
        (0, log_1.print)("Restarting server");
        server = yield (0, init_1.default)(app);
        restarting = false;
        if (scheduleRestart) {
            scheduleRestart = false;
            onChange();
        }
    });
    const onChange = () => __awaiter(void 0, void 0, void 0, function* () {
        if (restarting) {
            scheduleRestart = true;
            return;
        }
        restarting = true;
        (0, log_1.clear)();
        (0, log_1.print)("Stopping server");
        server.close(restart);
    });
    Object.values(globals_1.specs).forEach((item) => {
        fs_1.default.watch(item, {}, onChange);
    });
};
//# sourceMappingURL=watch.js.map