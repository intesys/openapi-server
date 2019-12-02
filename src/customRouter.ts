import express from "express";
import Fs from "fs";
import Path from "path";
import { CUSTOM_ROUTER_NAME } from "./config";
import { MOCKS_PATH } from "./lib/globals";

export default () => {
  const router = express.Router();
  const routerFile = Path.join(MOCKS_PATH, CUSTOM_ROUTER_NAME);
  try {
    const stat = Fs.statSync(routerFile);
    if (stat.isFile()) {
      const customRouter = require(routerFile);
      router.use(customRouter);
    }
  } catch (e) {}
  return router;
};
