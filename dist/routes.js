"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
const express_1 = __importDefault(require("express"));
const lodash_1 = require("lodash");
const openApiVersion_1 = __importDefault(require("./lib/openApiVersion"));
const v2_1 = __importStar(require("./routes/v2"));
const v3_1 = __importStar(require("./routes/v3"));
exports.operations = {
    get: "get",
    put: "put",
    post: "post",
    del: "delete",
    delete: "delete",
    options: "options",
    head: "head",
    patch: "patch",
};
exports.default = (spec) => {
    const router = express_1.default.Router();
    const version = (0, openApiVersion_1.default)(spec);
    const paths = (0, lodash_1.get)(spec, "paths", {});
    switch (version) {
        case 0 /* Version.v2 */:
            return (0, v2_1.default)(router, paths, (0, v2_1.getV2BasePath)(spec));
        case 1 /* Version.v3 */:
            return (0, v3_1.default)(router, paths, (0, v3_1.getV3BasePath)(spec));
        default:
            throw new Error("Unsupported openApi version");
    }
};
//# sourceMappingURL=routes.js.map