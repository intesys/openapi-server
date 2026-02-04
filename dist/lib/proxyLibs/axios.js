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
const axios_1 = __importDefault(require("axios"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const proxy_1 = require("../proxy");
const httpAgent = new http_1.default.Agent();
const httpsAgent = new https_1.default.Agent({ rejectUnauthorized: false });
const AxiosLib = (method, url, headers = {}) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = {
            method,
            headers,
            url,
            maxRedirects: 0,
            withCredentials: true,
            httpAgent,
            httpsAgent,
        };
        if (req.body) {
            // declare data only if there is a body!
            request.data = req.body;
        }
        const response = yield (0, axios_1.default)(request);
        return { data: response.data, headers: response.headers, status: response.status };
    }
    catch (err) {
        throw new proxy_1.RemoteError(`${method} ${url}`, err);
    }
});
exports.default = AxiosLib;
//# sourceMappingURL=axios.js.map