"use strict";
/**
 * Given an express instance:
 * - configures the router
 * - starts server
 * - returns the server
 */
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
const customMiddleware_1 = __importDefault(require("./customMiddleware"));
const globals_1 = require("./lib/globals");
const handleSigint_1 = __importDefault(require("./lib/handleSigint"));
const printServerInfo_1 = __importDefault(require("./lib/printServerInfo"));
const server_1 = require("./lib/server");
const handleErrors_1 = __importDefault(require("./middlewares/handleErrors"));
// import handleNotFound from "./middlewares/handleNotFound";
const router_1 = __importDefault(require("./router"));
const init = (app) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            app.set("trust proxy", true);
            app.use(yield customMiddleware_1.default(0 /* PRE */));
            const _router = yield router_1.default();
            app.use(_router);
            app.use(yield customMiddleware_1.default(1 /* POST */));
            app.use(handleErrors_1.default() /*, handleNotFound()*/);
            const server = server_1.createServer(globals_1.API_PROTOCOL, app);
            server.listen(globals_1.API_PORT, () => {
                printServerInfo_1.default();
                resolve(server);
            });
            server.on("error", (e) => {
                console.log(e);
            });
            handleSigint_1.default(server);
        }
        catch (err) {
            reject(err);
        }
    }));
});
exports.default = init;
//# sourceMappingURL=init.js.map