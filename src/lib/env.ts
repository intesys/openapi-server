const dotenv = require("dotenv");
const variableExpansion = require("dotenv-expand");
import { findFileInCwd } from "./findInCwd";

/**
 * @param {string} root
 */
const loadEnv = () => {
  const NODE_ENV = process.env.NODE_ENV || "development";
  const dotenvFiles = [
    `.env.${NODE_ENV}.local`,
    `.env.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== "test" && ".env.local",
    ".env"
  ].filter(Boolean);

  dotenvFiles.map(dotenvFile => {
    if (!dotenvFile) {
      return;
    }
    const envPath = findFileInCwd([dotenvFile]);
    if (envPath) {
      const envs = dotenv.config({ path: envPath });
      variableExpansion(envs);
    }
  });
};

loadEnv();
