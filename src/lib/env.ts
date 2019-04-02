import findInCwd from "./findInCwd";

const envFiles = [".env.development.local", ".env.development", ".env"];

const ENV_FILE = findInCwd(envFiles);

if (ENV_FILE) {
  require("dotenv").config({ path: ENV_FILE });
}
