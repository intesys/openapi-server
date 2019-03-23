import Env from "./types/env";
import { isBoolean } from "lodash";

export const defaults: Env = {
  API_YML: "api.yml",
  API_PREFIX: "/api",
  API_PORT: "3000",
  API_PROTOCOL: "http",
  API_HOSTNAME: "localhost",
  RESOURCES_PREFIX: "/resources",
  MOCKS_PATH: "/mocks",

  PROXY_PROTOCOL: "http",
  PROXY_HOSTNAME: "localhost",
  PROXY_PORT: "3001",
  PROXY_PREFIX: "/api",
  PROXY_RESOURCES_PREFIX: "/resources",

  SKIP_VALIDATION: false,
  LOG: false,
  WATCH: false,
  AUTO_MOCK: false
};

// list of config keys
export const options: string[] = (() => Object.keys(defaults))();

// boolean config values
export const booleans: string[] = (() =>
  options.filter(key => isBoolean(defaults[key])))();
