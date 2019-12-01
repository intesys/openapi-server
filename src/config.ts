import { isBoolean } from "lodash";
import Env, { HTTPProtocol } from "./types/env";

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
  WATCH: false
};

// list of config keys
export const options: string[] = Object.keys(defaults);

// boolean config values
export const booleans: string[] = options.filter(key =>
  isBoolean(defaults[key])
);
