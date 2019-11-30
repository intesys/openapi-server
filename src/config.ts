import { isBoolean } from "lodash";
import Env from "./types/env";

export const defaults: Env = {
  API_YML: "/examples/api.yml,/examples/api",
  API_PREFIX: "/api",
  API_PORT: "3000",
  API_PROTOCOL: "http",
  API_HOSTNAME: "localhost",

  RESOURCES: false,
  RESOURCES_PREFIX: "/examples/resources",

  MOCKS: true,
  MOCKS_PATH: "/examples/mocks",

  PROXY: false,
  PROXY_PROTOCOL: "http",
  PROXY_HOSTNAME: "localhost",
  PROXY_PORT: "3001",
  PROXY_PREFIX: "/api",
  PROXY_RESOURCES_PREFIX: "/resources",

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
