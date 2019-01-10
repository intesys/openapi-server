import Path from 'path';
import findUp from './findUp';

const envFiles = ['.env.development.local', '.env.development', '.env'];

const ENV_FILE = findUp(envFiles, Path.join(__dirname, '../../..'));

if (ENV_FILE) {
  require('dotenv').config({ path: ENV_FILE });
} else {
  // fallback to local .env file, useful for tests only
  const MODULE_ENV_FILE = Path.join(__dirname, '../../.env');
  require('dotenv').config({ path: MODULE_ENV_FILE });
}
