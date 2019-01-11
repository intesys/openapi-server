import express, { Application } from "express";
import router from './router';
import { API_PORT, API_PROTOCOL, API_HOSTNAME } from './lib/globals';

const port = API_PORT || '3000';

const app = async (): Promise<Application> => {

  const app: Application = express();

  const _router = await router();

  app.use(_router);

  const server = app.listen(port, () => {
    console.log(`Server running at ${API_PROTOCOL}://${API_HOSTNAME}:${port}`);
  });

  process.on('SIGINT', function () {
    console.log('Bye');
    server.close(() => { process.exit(0) });
  });

  return app;
}

export default app;
