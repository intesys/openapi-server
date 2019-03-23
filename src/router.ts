import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { OpenAPI } from 'openapi-types';
import openApiSchemaValidate from './lib/openApiSchemaValidate';
import routes from './routes';
import handleErrors from './middlewares/handleErrors';
import sendBody from './middlewares/sendBody';
import load from './lib/load';
import { API_YML, API_PREFIX } from './lib/globals';
import getPrefix from './lib/getPrefix';

const router = async (): Promise<Router> => {
  const router: Router = express.Router();
  try {

    const prefix = '/' + getPrefix(API_PREFIX);
    const spec: OpenAPI.Document = await load(API_YML);
    openApiSchemaValidate(spec);

    router.options('*', cors());

    router.use(
      cors({ credentials: true }),
      bodyParser.urlencoded({ extended: false }),
      bodyParser.json()
    );

    router.use(prefix,
      routes(spec),
      sendBody(),
      handleErrors()
    );

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  return router;
};

export default router;
