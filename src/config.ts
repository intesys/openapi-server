import { isBoolean } from "lodash";
import Env from "./types/env";

export const defaults: Env = {
  API_YML: "api.yaml",
  API_PREFIX: "/api",
  API_PORT: "3000",
  API_PROTOCOL: "http",
  API_HOSTNAME: "localhost",

  RESOURCES: false,
  RESOURCES_PREFIX: "/resources",

  MOCKS: true,
  MOCKS_PATH: "/mocks",

  PROXY: false,
  PROXY_PROTOCOL: "",
  PROXY_HOSTNAME: "",
  PROXY_PORT: "",
  PROXY_PREFIX: "",
  PROXY_RESOURCES_PREFIX: "",

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
