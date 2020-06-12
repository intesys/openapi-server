import express, { Express } from "express";
import init from "./init";
import { WATCH } from "./lib/globals";
import { clear, error, print } from "./lib/log";
import watch from "./watch";

const app = async (): Promise<Express> => {
  try {
    clear();
    print("Starting server");

    const expressInstance: Express = express();

    const server = await init(expressInstance);

    if (WATCH) {
      watch(expressInstance, server);
    }

    return expressInstance;
  } catch (e) {
    error(e);
    process.exit(1);
  }
};

export default app;
