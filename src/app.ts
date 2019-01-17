import express, { Application } from "express";
import router from './router';
import { API_YML, API_PORT, API_PROTOCOL, API_HOSTNAME, MOCKS_PATH, PROXY_PROTOCOL, PROXY_HOSTNAME, PROXY_PORT, PROXY_PREFIX, LOG, API_PREFIX } from './lib/globals';
import { print } from './lib/log';

const port = API_PORT || '3000';

const app = async (): Promise<Application> => {

  const app: Application = express();

  const _router = await router();

  app.use(_router);

  const server = app.listen(port, () => {
    print(`Server running at ${API_PROTOCOL}://${API_HOSTNAME}:${port}`);
    print({
      'API YML': API_YML,
      'API PREFIX': API_PREFIX,
      'MOCKS PATH': MOCKS_PATH,
      'PROXY URL': `${PROXY_PROTOCOL}://${PROXY_HOSTNAME}:${PROXY_PORT}${PROXY_PREFIX}`,
      'LOG REQUESTS': LOG
    });
  });

  process.on('SIGINT', function () {
    print('Bye');
    server.close(() => { process.exit(0) });
  });

  return app;
}

export default app;
