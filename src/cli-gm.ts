import program from "commander";
import { pick } from "lodash";
import path from "path";
import { options } from "./config";
import Env from "./types/env";

const version = require(path.join(__dirname, "../package.json")).version;

program
  .version(version, "-v, --version")
  .allowUnknownOption()
  .option("-a,--API_YML [value]", "api yml file / folder / list of file or folders")
  .option("-m,--MOCKS_PATH [value]", "mocks path")
  .option("-l,--LOG", "enable console log")
  .option("--VERBOSE [number]", "depth of logs shown")
  .parse(process.argv);

const cliOptions: Partial<Env> = pick(program, options);

// overwrite env variables
Object.keys(cliOptions).forEach(key => (process.env[key] = cliOptions[key]));

require("./generate-mocks").default();
