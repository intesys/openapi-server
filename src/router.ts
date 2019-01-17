import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Path from 'path';
import { OpenAPI } from 'openapi-types';
import openApiSchemaValidate from './lib/openApiSchemaValidate';
import routes from './routes';
import handleErrors from './middlewares/handleErrors';
import sendBody from './middlewares/sendBody';
import load from './lib/load';
import { API_YML, API_PREFIX } from './lib/globals';

const router = async (): Promise<Router> => {
  const router: Router = express.Router();
  try {

    const spec: OpenAPI.Document = await load(API_YML);
    openApiSchemaValidate(spec);

    router.use(
      cors(),
      bodyParser.json()
    );

    router.use(API_PREFIX,
      routes(spec),
      sendBody(),
      handleErrors()
    );

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  return router;
}

export default router;
