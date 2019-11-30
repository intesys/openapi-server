import { pick } from "lodash";
import { booleans, defaults, options } from "../config";
import Env from "../types/env";
import { findDirInCwd } from "./findInCwd";
import getPort from "./getPort";
import getPrefix from "./getPrefix";
import { fixBooleans } from "./toBoolean";
import { findSpecs } from "./findSpecs";

require("./env");

const env = (pick(process.env, options) as unknown) as Env;

const globals: Env = fixBooleans({ ...defaults, ...env }, booleans) as Env;

const exitWithError = (message: string, code: number = 1) => {
  const err = new Error(message);
  console.error(err);
  process.exit(code);
  return ""; // for typescript compliance only
};

export const ROOT_DIR = process.cwd();

// MOCKS_PATH and API_YML must be absolute paths

if (globals.MOCKS) {
  globals.MOCKS_PATH =
    findDirInCwd(globals.MOCKS_PATH) ||
    exitWithError(`Directory not found: ${globals.MOCKS_PATH}`);
}

export const specs: string[] =
  findSpecs(globals.API_YML) ||
  exitWithError(`Invalid param: ${globals.API_YML}`);

const {
  API_YML,
  API_PREFIX,
  API_PORT,
  API_PROTOCOL,
  API_HOSTNAME,
  RESOURCES,
  RESOURCES_PREFIX,
  MOCKS,
  MOCKS_PATH,
  PROXY,
  PROXY_PROTOCOL,
  PROXY_HOSTNAME,
  PROXY_PORT,
  PROXY_PREFIX,
  PROXY_RESOURCES_PREFIX,
  SKIP_VALIDATION,
  LOG,
  WATCH
}: Env = globals;

export {
  API_YML,
  API_PREFIX,
  API_PORT,
  API_PROTOCOL,
  API_HOSTNAME,
  RESOURCES,
  RESOURCES_PREFIX,
  MOCKS,
  MOCKS_PATH,
  PROXY,
  PROXY_PROTOCOL,
  PROXY_HOSTNAME,
  PROXY_PORT,
  PROXY_PREFIX,
  PROXY_RESOURCES_PREFIX,
  SKIP_VALIDATION,
  LOG,
  WATCH
};

const port = getPort(PROXY_PORT);
const prefix = getPrefix(PROXY_PREFIX);

export const proxyUrl = `${PROXY_PROTOCOL}://${PROXY_HOSTNAME}${port}${prefix}`;
