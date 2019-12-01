import express, { Express } from "express";
import { print, clear } from "./lib/log";
import init from "./init";
import { WATCH } from "./lib/globals";
import watch from "./watch";

const app = async (): Promise<Express> => {
  clear();
  print("Starting server");

  const app: Express = express();

  const server = await init(app);

  if (WATCH) {
    watch(app, server);
  }

  return app;
};

export default app;
