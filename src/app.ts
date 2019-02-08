import express, { Application } from "express";
import { print, clear } from './lib/log';
import init from "./init";
import { WATCH } from "./lib/globals";
import watch from "./watch";

const app = async (): Promise<Application> => {

  clear();
  print('Starting server');

  const app: Application = express();

  const server = await init(app);

  if (WATCH) {
    watch(app, server);
  }

  return app;
}

export default app;
