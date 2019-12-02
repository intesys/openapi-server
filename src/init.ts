/**
 * Given an express instance:
 * - configures the router
 * - starts server
 * - returns the server
 */

import { Express } from "express";
import { Server } from "net";
import customRouter from "./customRouter";
import { API_PORT, API_PROTOCOL } from "./lib/globals";
import handleSigint from "./lib/handleSigint";
import printServerInfo from "./lib/printServerInfo";
import { createServer } from "./lib/server";
import router from "./router";

const init = async (app: Express): Promise<Server> =>
  new Promise(async (resolve, reject) => {
    try {
      app.set("trust proxy", true);

      const _customRouter = await customRouter();
      app.use(_customRouter);

      const _router = await router();
      app.use(_router);

      const server = createServer(API_PROTOCOL, app);

      server.listen(API_PORT, () => {
        printServerInfo();
        resolve(server);
      });

      server.on("error", (e: Error) => {
        console.log(e);
      });

      handleSigint(server);
    } catch (err) {
      reject(err);
    }
  });

export default init;
