import express, { Router } from "express";
import Fs from "fs";
import Path from "path";
import {
  CUSTOM_MIDDLEWARES,
  CUSTOM_MIDDLEWARES_NAMES,
  CUSTOM_MIDDLEWARES_PATH,
} from "./config";
import { MOCKS_PATH } from "./lib/globals";
import { print } from "./lib/log";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAsyncFunction = (fn: any): boolean =>
  fn[Symbol.toStringTag] === "AsyncFunction";

const isFile = (routerFile: string): boolean => {
  try {
    const stat = Fs.statSync(routerFile);
    if (stat.isFile()) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export default async (middleware: CUSTOM_MIDDLEWARES): Promise<Router> => {
  const router = express.Router();
  const routerFile = Path.join(
    MOCKS_PATH,
    CUSTOM_MIDDLEWARES_PATH,
    CUSTOM_MIDDLEWARES_NAMES[middleware]
  );
  if (isFile(routerFile)) {
    print(`Using custom middleware: ${routerFile}`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const customRouter = require(routerFile);
    if (isAsyncFunction(customRouter)) {
      const awaitedCustomRouter = await customRouter();
      router.use(awaitedCustomRouter);
    } else {
      router.use(customRouter);
    }
  }
  return router;
};
