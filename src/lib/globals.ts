import Env from "../types/env";
import fs from "fs";
import path from "path";
import { options, defaults, booleans } from "../config";
import { pick } from "lodash";
import getPort from "./getPort";
import getPrefix from "./getPrefix";
import { fixBooleans } from "./toBoolean";
import { findFileInCwd, findDirInCwd } from "./findInCwd";

require("./env");

const env = (pick(process.env, options) as unknown) as Env;

const globals: Env = fixBooleans({ ...defaults, ...env }, booleans) as Env;

const exitWithError = (message: string, code: number = 1) => {
  const err = new Error(message);
  console.error(err);
  process.exit(code);
  return ""; // for typescript compliance only
};

// MOCKS_PATH and API_YML must be absolute paths
globals.MOCKS_PATH =
  findDirInCwd(globals.MOCKS_PATH) ||
  exitWithError(`Directory not found: ${globals.MOCKS_PATH}`);
globals.API_YML =
  findFileInCwd(globals.API_YML) ||
  exitWithError(`File not found: ${globals.API_YML}`);

const {
  API_YML,
  API_PREFIX,
  API_PORT,
  API_PROTOCOL,
  API_HOSTNAME,
  RESOURCES_PREFIX,
  MOCKS_PATH,
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
  RESOURCES_PREFIX,
  MOCKS_PATH,
  PROXY_PROTOCOL,
  PROXY_HOSTNAME,
  PROXY_PORT,
  PROXY_PREFIX,
  PROXY_RESOURCES_PREFIX,
  SKIP_VALIDATION,
  LOG,
  WATCH
};

export const proxyUrl = `${PROXY_PROTOCOL}://${PROXY_HOSTNAME}${getPort(
  PROXY_PORT
)}${getPrefix(PROXY_PREFIX)}`;
