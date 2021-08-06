"use strict";
/**
 * By design this lib takes only the first server
 * and uses it's path to prefix routes.
 *
 * If proxy is enabled, proxy configuration is used
 * instead of server described in spec.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getV3BasePath = void 0;
const lodash_1 = require("lodash");
const joinUrl_1 = __importDefault(require("../lib/joinUrl"));
const toExpressParam_1 = __importDefault(require("../lib/toExpressParam"));
const routes_1 = require("../routes");
const middlewares_1 = __importDefault(require("./middlewares"));
const compileServerVars = (url, variables) => {
    const mapObj = {};
    Object.keys(variables).map(item => {
        return (mapObj["{" + item + "}"] = variables[item].default);
    });
    var regex = new RegExp("(" + Object.keys(mapObj).join("|") + ")", "gi");
    const newUrl = url.replace(regex, function (matched) {
        return mapObj[matched];
    });
    return newUrl;
};
const getServer = (servers) => {
    const server = servers[0];
    const variables = lodash_1.get(server, "variables");
    const url = lodash_1.get(server, "url");
    if (variables) {
        return compileServerVars(url, variables);
    }
    return url;
};
const getPath = (server) => {
    try {
        const url = new URL(server);
        return url.pathname;
    }
    catch (e) {
        // assuming server is a partial uri
        return server;
    }
};
const getV3BasePath = (spec) => {
    const serverFallback = { url: "" };
    const servers = lodash_1.get(spec, "servers", [serverFallback]);
    const server = getServer(servers);
    return getPath(server);
};
exports.getV3BasePath = getV3BasePath;
const buildV3Routes = (router, paths, basePath) => {
    Object.keys(paths).forEach((route) => {
        const fullRoute = joinUrl_1.default(basePath, route);
        const expressRoute = toExpressParam_1.default(fullRoute);
        const routerRef = router.route(expressRoute);
        const methods = Object.keys(routes_1.operations);
        const spec = paths[route];
        methods.forEach(_method => {
            const method = routes_1.operations[_method];
            const operationSpec = spec[method];
            if (!operationSpec) {
                // skip because method is not defined in spec
                return;
            }
            const middlewares = middlewares_1.default(method, fullRoute, operationSpec);
            routerRef[method](middlewares);
        });
    });
    return router;
};
exports.default = buildV3Routes;
//# sourceMappingURL=v3.js.map