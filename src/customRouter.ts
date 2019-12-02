import express from "express";
import Fs from "fs";
import Path from "path";
import { CUSTOM_ROUTER_NAME } from "./config";
import { MOCKS_PATH } from "./lib/globals";

const isAsyncFunction = (fn: any): boolean =>
  fn[Symbol.toStringTag] === "AsyncFunction";

export default async () => {
  const router = express.Router();
  const routerFile = Path.join(MOCKS_PATH, CUSTOM_ROUTER_NAME);
  try {
    const stat = Fs.statSync(routerFile);
    if (stat.isFile()) {
      const customRouter = require(routerFile);
      if (isAsyncFunction(customRouter)) {
        const awaitedCustomRouter = await customRouter();
        router.use(awaitedCustomRouter);
      } else {
        router.use(customRouter);
      }
    }
  } catch (e) {}
  return router;
};
