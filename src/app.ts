import express, { Application } from "express";
import router from './router';
import { API_YML, API_PORT, API_PROTOCOL, API_HOSTNAME, MOCKS_PATH, PROXY_PROTOCOL, PROXY_HOSTNAME, PROXY_PORT, PROXY_PREFIX, LOG, API_PREFIX, SKIP_VALIDATION } from './lib/globals';
import { print } from './lib/log';

const port = API_PORT || '3000';

const app = async (): Promise<Application> => {

  const app: Application = express();

  const _router = await router();

  app.use(_router);

  const server = app.listen(port, () => {
    print(`Server running at ${API_PROTOCOL}://${API_HOSTNAME}:${port}`);
    print({
      'Api yml': API_YML,
      'Api prefix': API_PREFIX,
      'Mock path': MOCKS_PATH,
      'Proxy URL': `${PROXY_PROTOCOL}://${PROXY_HOSTNAME}:${PROXY_PORT}${PROXY_PREFIX}`,
      'Validate responses': SKIP_VALIDATION ? 'disabled' : 'enabled',
      'Log requests': LOG ? 'enabled' : 'disabled'
    });
  });

  server.on('error', (e: Error) => {
    console.log(e);
  })

  process.on('SIGINT', function () {
    print('Bye');
    server.close(() => { process.exit(0) });
  });

  return app;
}

export default app;
