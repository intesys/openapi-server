"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getV2BasePath = void 0;
const lodash_1 = require("lodash");
const joinUrl_1 = __importDefault(require("../lib/joinUrl"));
const toExpressParam_1 = __importDefault(require("../lib/toExpressParam"));
const routes_1 = require("../routes");
const middlewares_1 = __importDefault(require("./middlewares"));
const getV2BasePath = (spec) => lodash_1.get(spec, "basePath", "");
exports.getV2BasePath = getV2BasePath;
const buildV2Routes = (router, paths, basePath) => {
    Object.keys(paths).forEach((route) => {
        const fullRoute = joinUrl_1.default(basePath, route);
        const expressRoute = toExpressParam_1.default(fullRoute);
        const routerRef = router.route(expressRoute);
        const methods = Object.keys(routes_1.operations);
        const spec = paths[route];
        methods.forEach(_method => {
            const method = routes_1.operations[_method];
            const operationSpec = spec[method];
            const middlewares = middlewares_1.default(method, fullRoute, operationSpec);
            routerRef[method](middlewares);
        });
    });
    return router;
};
exports.default = buildV2Routes;
//# sourceMappingURL=v2.js.map