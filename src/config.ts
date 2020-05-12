import { isBoolean } from "lodash";
import Env, { HTTPProtocol } from "./types/env";

export enum CUSTOM_MIDDLEWARES {
  "PRE",
  "POST",
}
export type CUSTOM_MIDDLEWARES_TYPE = {
  [CUSTOM_MIDDLEWARES.PRE]: string;
  [CUSTOM_MIDDLEWARES.POST]: string;
};
export const CUSTOM_MIDDLEWARES_PATH = "__middlewares__";
export const CUSTOM_MIDDLEWARES_NAMES: CUSTOM_MIDDLEWARES_TYPE = {
  [CUSTOM_MIDDLEWARES.PRE]: "pre.js",
  [CUSTOM_MIDDLEWARES.POST]: "post.js",
};

export const defaults: Env = {
  API_YML: "",
  API_PREFIX: "",
  API_PORT: "3000",
  API_PROTOCOL: HTTPProtocol.http,
  API_HOSTNAME: "localhost",

  STATIC: false,
  STATIC_PREFIX: "/static",
  STATIC_PATH: "/static",

  MOCKS: true,
  MOCKS_PATH: "/mocks",

  PROXY: false,
  PROXY_PROTOCOL: HTTPProtocol.http,
  PROXY_HOSTNAME: "",
  PROXY_PORT: "",
  PROXY_PREFIX: "",
  PROXY_FILTER_HEADERS: false,

  SKIP_VALIDATION: false,
  LOG: false,
  VERBOSE: 2,
  WATCH: false,
};

// list of config keys
export const options: string[] = Object.keys(defaults);

// boolean config values
export const booleans: string[] = options.filter(key => isBoolean(defaults[key]));

export enum PROXY_LIBS {
  AXIOS,
  POSTMAN_REQUEST,
  NODE_FETCH,
}

// proxy library in use, can be axios, postman-request, nodeFetch
export const proxyLib: PROXY_LIBS = PROXY_LIBS.AXIOS;
