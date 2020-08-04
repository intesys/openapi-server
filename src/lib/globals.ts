import { pick } from "lodash";
import { booleans, defaults, options } from "../config";
import Env from "../types/env";
import { findDirInCwd } from "./findInCwd";
import { findSpecs } from "./findSpecs";
import getPort from "./getPort";
import getPrefix from "./getPrefix";
import { fixBooleans } from "./toBoolean";

require("./env");

const env = (pick(process.env, options) as unknown) as Env;

const globals: Env = fixBooleans({ ...defaults, ...env }, booleans) as Env;

const exitWithError = (message: string, code = 1) => {
  const err = new Error(message);
  console.error(err);
  throw err;
};

// Absolutize MOCKS_PATH
globals.MOCKS_PATH =
  findDirInCwd(globals.MOCKS_PATH || "/") ||
  exitWithError(`Directory not found: ${globals.MOCKS_PATH}`);

// Absolutize API_YML path
export const specs: string[] =
  findSpecs(globals.API_YML) ||
  exitWithError(`Invalid param: ${globals.API_YML}`);

const {
  API_YML,
  API_PREFIX,
  API_PORT,
  API_PROTOCOL,
  API_HOSTNAME,
  STATIC,
  STATIC_PREFIX,
  STATIC_PATH,
  MOCKS,
  MOCKS_PATH,
  PROXY,
  PROXY_PROTOCOL,
  PROXY_HOSTNAME,
  PROXY_PORT,
  PROXY_PREFIX,
  PROXY_FILTER_HEADERS,
  SKIP_VALIDATION,
  LOG,
  VERBOSE,
  WATCH,
}: Env = globals;

export {
  API_YML,
  API_PREFIX,
  API_PORT,
  API_PROTOCOL,
  API_HOSTNAME,
  STATIC,
  STATIC_PREFIX,
  STATIC_PATH,
  MOCKS,
  MOCKS_PATH,
  PROXY,
  PROXY_PROTOCOL,
  PROXY_HOSTNAME,
  PROXY_PORT,
  PROXY_PREFIX,
  PROXY_FILTER_HEADERS,
  SKIP_VALIDATION,
  LOG,
  VERBOSE,
  WATCH,
};

const port = getPort(PROXY_PORT);
const prefix = getPrefix(PROXY_PREFIX);

export const proxyUrl = `${PROXY_PROTOCOL}://${PROXY_HOSTNAME}${port}${prefix}`;
