import bodyParser from "body-parser";
import cors from "cors";
import express, { Router } from "express";
import glob from "glob";
import { OpenAPI } from "openapi-types";
import path from "path";
import getPrefix from "./lib/getPrefix";
import { API_PREFIX, API_YML } from "./lib/globals";
import load from "./lib/load";
import openApiSchemaValidate from "./lib/openApiSchemaValidate";
import handleErrors from "./middlewares/handleErrors";
import sendBody from "./middlewares/sendBody";
import routes from "./routes";

const router = async (): Promise<Router> => {
  const router: Router = express.Router();
  try {
    router.options("*", cors());
    router.use(
      cors({ credentials: true }),
      bodyParser.urlencoded({ extended: false }),
      bodyParser.json()
    );

    const prefix = getPrefix(API_PREFIX);
    const globOptions = {
      cwd: API_YML
    };
    glob("**/*.{yaml,yml}", globOptions, async (er, files) => {
      files.forEach(async (file: string) => {
        const absPathFile = path.resolve(API_YML, file);
        const spec: OpenAPI.Document = await load(absPathFile);
        openApiSchemaValidate(spec);
        router.use(prefix, routes(spec), sendBody(), handleErrors());
      });
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  return router;
};

export default router;
