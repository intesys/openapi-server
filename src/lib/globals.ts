import Env from "../types/env";
import path from 'path';
import program from 'commander';
import { options, defaults, booleans } from '../config';
import { pick } from 'lodash';
import { fixBooleans } from './toBoolean';
import findUp from './findUp';

require('./env');

const env = process.env as Env;

const version = require(path.join(__dirname, '../../package.json')).verison;

program
  .version(version, '-v, --version')
  .allowUnknownOption()
  .option('-a,--API_YML [value]', 'api yml file')
  .option('-m,--MOCKS_PATH [value]', 'mocks path')
  .option('-l,--LOG [value]', 'mocks path')
  .option('-s,--SKIP_VALIDATION', 'turn validation')
  .option('--API_PREFIX [value]')
  .option('--API_PORT [value]')
  .option('--API_PROTOCOL [value]')
  .option('--API_HOSTNAME [value]')
  .option('--RESOURCES_PREFIX [value]')
  .option('--PROXY_PROTOCOL [value]')
  .option('--PROXY_HOSTNAME [value]')
  .option('--PROXY_PORT [value]')
  .option('--PROXY_PREFIX [value]')
  .option('--PROXY_RESOURCES_PREFIX [value]')
  .parse(process.argv);

const _env = pick(env, options)
const _program = pick(program, options);

const globals: Env = fixBooleans({ ...defaults, ..._env, ..._program }, booleans) as Env;

// MOCKS_PATH must be absolute
globals.MOCKS_PATH = findUp(globals.MOCKS_PATH, path.join(__dirname, '../../..')) || path.join(__dirname, '../..', globals.MOCKS_PATH);

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
  LOG
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
  LOG
}
