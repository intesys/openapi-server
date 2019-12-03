/**
 * Given an express instance:
 * - configures the router
 * - starts server
 * - returns the server
 */

import { Express } from "express";
import { Server } from "net";
import { CUSTOM_MIDDLEWARES } from "./config";
import customMiddleware from "./customMiddleware";
import { API_PORT, API_PROTOCOL } from "./lib/globals";
import handleSigint from "./lib/handleSigint";
import printServerInfo from "./lib/printServerInfo";
import { createServer } from "./lib/server";
import handleErrors from "./middlewares/handleErrors";
import handleNotFound from "./middlewares/handleNotFound";
import router from "./router";

const init = async (app: Express): Promise<Server> =>
  new Promise(async (resolve, reject) => {
    try {
      app.set("trust proxy", true);

      app.use(await customMiddleware(CUSTOM_MIDDLEWARES.PRE));

      const _router = await router();
      app.use(_router);

      app.use(await customMiddleware(CUSTOM_MIDDLEWARES.POST));

      app.use(handleErrors(), handleNotFound());

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
