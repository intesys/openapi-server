import express, { Express } from "express";
import { print, clear } from "./lib/log";
import init from "./init";
import { WATCH } from "./lib/globals";
import watch from "./watch";

const app = async (): Promise<Express> => {
  clear();
  print("Starting server");

  const expressInstance: Express = express();

  const server = await init(expressInstance);

  if (WATCH) {
    watch(expressInstance, server);
  }

  return expressInstance;
};

export default app;
