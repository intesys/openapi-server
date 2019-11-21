import Env from "./types/env";
import path from "path";
import program from "commander";
import { options } from "./config";
import { pick } from "lodash";

const version = require(path.join(__dirname, "../package.json")).version;

program
  .version(version, "-v, --version")
  .allowUnknownOption()
  .option(
    "-a,--API_YML [value]",
    "api yml file / folder / list of file or folders"
  )
  .option("-m,--MOCKS_PATH [value]", "mocks path")
  .option("-l,--LOG", "enable console log")
  .option("-s,--SKIP_VALIDATION", "turn off validation")
  .option("-w,--WATCH", "restart the server on changes")
  .option("--API_PREFIX [value]")
  .option("--API_PORT [value]")
  .option("--API_PROTOCOL [value]")
  .option("--API_HOSTNAME [value]")
  .option("--RESOURCES_PREFIX [value]")
  .option("--PROXY_PROTOCOL [value]")
  .option("--PROXY_HOSTNAME [value]")
  .option("--PROXY_PORT [value]")
  .option("--PROXY_PREFIX [value]")
  .option("--PROXY_RESOURCES_PREFIX [value]")
  .parse(process.argv);

const cliOptions: Partial<Env> = pick(program, options);

// overwrite env variables
Object.keys(cliOptions).forEach(key => (process.env[key] = cliOptions[key]));

require("./app").default();
