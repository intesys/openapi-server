/**
 * Given an express instance:
 * - configures the router
 * - starts server
 * - returns the server
 */

import { Express } from "express";
import { Server } from "net";
import { API_PORT, API_PROTOCOL } from "./lib/globals";
import handleSigint from "./lib/handleSigint";
import printServerInfo from "./lib/printServerInfo";
import { createServer } from "./lib/server";
import handleErrors from "./middlewares/handleErrors";
import router from "./router";

const init = async (app: Express): Promise<Server> => {
  const _router = await router();

  return new Promise((resolve, reject) => {
    try {
      app.set("trust proxy", true);
      app.use(_router);
      app.use(handleErrors());

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
}

export default init;
