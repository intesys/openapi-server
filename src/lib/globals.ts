import Env from "../types/env";
import path from 'path';
import { options, defaults, booleans } from '../config';
import { pick } from 'lodash';
import { fixBooleans } from './toBoolean';
import findUp from './findUp';

require('./env');

const env = pick(process.env, options) as Env;

const globals: Env = fixBooleans({ ...defaults, ...env }, booleans) as Env;

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
