import bodyParser from "body-parser";
import cors from "cors";
import express, { Router } from "express";
import getPrefix from "./lib/getPrefix";
import {
  API_PREFIX,
  RESOURCES,
  RESOURCES_FOLDER,
  RESOURCES_PREFIX,
  specs
} from "./lib/globals";
import load from "./lib/load";
import openApiSchemaValidate from "./lib/openApiSchemaValidate";
import { validateSpecsOrThrow } from "./lib/validatePaths";
import handleErrors from "./middlewares/handleErrors";
import handleStatic from "./middlewares/handleStatic";
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

    RESOURCES && router.use(RESOURCES_PREFIX, handleStatic(RESOURCES_FOLDER));

    const prefix = getPrefix(API_PREFIX);

    const specDocs = await Promise.all(specs.map(spec => load(spec)));

    validateSpecsOrThrow(specDocs);

    specDocs.forEach(spec => {
      openApiSchemaValidate(spec);
      router.use(prefix, routes(spec), sendBody(), handleErrors());
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  return router;
};

export default router;
