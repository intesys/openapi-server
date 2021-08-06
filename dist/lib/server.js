"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createServer = (protocol, app) => {
    switch (protocol) {
        case "https":
            return createHttps(app);
        case "http":
        default:
            return createHttp(app);
    }
};
exports.createServer = createServer;
const createHttp = (app) => http_1.default.createServer(app);
const createHttps = (app) => https_1.default.createServer({
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, "../../cert/server.key")),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "../../cert/server.cert")),
}, app);
//# sourceMappingURL=server.js.map