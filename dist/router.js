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
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const getPrefix_1 = __importDefault(require("./lib/getPrefix"));
const globals_1 = require("./lib/globals");
const load_1 = __importDefault(require("./lib/load"));
const openApiSchemaValidate_1 = __importDefault(require("./lib/openApiSchemaValidate"));
const validatePaths_1 = require("./lib/validatePaths");
const handleStatic_1 = __importDefault(require("./middlewares/handleStatic"));
const sendBody_1 = __importDefault(require("./middlewares/sendBody"));
const routes_1 = __importDefault(require("./routes"));
const router = () => __awaiter(void 0, void 0, void 0, function* () {
    const router = express_1.default.Router();
    try {
        router.options("*", cors_1.default());
        router.use(compression_1.default(), cors_1.default({ credentials: true }), express_1.default.urlencoded({ extended: false, limit: "100mb" }), express_1.default.json({ limit: "100mb" }));
        globals_1.STATIC && router.use(globals_1.STATIC_PREFIX, handleStatic_1.default(globals_1.STATIC_PATH));
        const prefix = getPrefix_1.default(globals_1.API_PREFIX);
        const specDocs = yield Promise.all(globals_1.specs.map((spec) => load_1.default(spec)));
        validatePaths_1.validateSpecsOrThrow(specDocs);
        specDocs.forEach((spec) => {
            openApiSchemaValidate_1.default(spec);
            router.use(prefix, routes_1.default(spec), sendBody_1.default());
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
    return router;
});
exports.default = router;
//# sourceMappingURL=router.js.map