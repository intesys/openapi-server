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
  API_YML: "api.yaml",
  API_PREFIX: "/api",
  API_PORT: "3000",
  API_PROTOCOL: HTTPProtocol.http,
  API_HOSTNAME: "localhost",

  STATIC: false,
  STATIC_PREFIX: "/resources",
  STATIC_PATH: "/resources",

  MOCKS: true,
  MOCKS_PATH: "/mocks",

  PROXY: false,
  PROXY_PROTOCOL: HTTPProtocol.http,
  PROXY_HOSTNAME: "",
  PROXY_PORT: "",
  PROXY_PREFIX: "",

  SKIP_VALIDATION: false,
  LOG: false,
  VERBOSE: 2,
  WATCH: false,
};

// list of config keys
export const options: string[] = Object.keys(defaults);

console.log("options", options);

// boolean config values
export const booleans: string[] = options.filter(key => isBoolean(defaults[key]));
console.log("booleans", booleans);

// proxy library in use, can be axios, postman-request, got
export const proxyLib: string = "postman-request";
