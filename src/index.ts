import express from 'express';
import bodyParser from 'body-parser';
import Path from 'path';
import { OpenAPI } from 'openapi-types';
import openApiSchemaValidate from './lib/openApiSchemaValidate';
import routes from './routes';
import handleErrors from './middlewares/handleErrors';
import sendBody from './middlewares/sendBody';
import load from './lib/load';

import { API_YML, API_PREFIX, API_PORT, API_PROTOCOL, API_HOSTNAME, RESOURCES_PREFIX } from './lib/globals';

const apiFile = Path.join(__dirname, '..', API_YML);

const port = API_PORT || '3000';

(async () => {
  try {

    const spec: OpenAPI.Document = await load(apiFile);
    openApiSchemaValidate(spec);

    const app = express();
    app.use(bodyParser.json());
    app.use(API_PREFIX,
      routes(spec),
      sendBody(),
      handleErrors()
    );

    const server = app.listen(port, () => {
      console.log(`Server running at ${API_PROTOCOL}://${API_HOSTNAME}:${port}`);
    });

    process.on('SIGINT', function () {
      console.log('Bye');
      server.close(() => { process.exit(0) });
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
