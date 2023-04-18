import Env from "./types/env";
export declare const enum CUSTOM_MIDDLEWARES {
    "PRE" = 0,
    "POST" = 1
}
export declare type CUSTOM_MIDDLEWARES_TYPE = {
    [CUSTOM_MIDDLEWARES.PRE]: string;
    [CUSTOM_MIDDLEWARES.POST]: string;
};
export declare const CUSTOM_MIDDLEWARES_PATH = "__middlewares__";
export declare const CUSTOM_MIDDLEWARES_NAMES: CUSTOM_MIDDLEWARES_TYPE;
export declare const defaults: Env;
export declare const options: string[];
export declare const booleans: string[];
export declare const enum PROXY_LIBS {
    AXIOS = 0,
    POSTMAN_REQUEST = 1,
    NODE_FETCH = 2
}
export declare const proxyLib: PROXY_LIBS;
