/**
 * Given an express instance:
 * - configures the router
 * - starts server
 * - returns the server
 */

import { Application } from "express";
import { Server } from "net";
import {
  API_PROTOCOL,
  API_HOSTNAME,
  API_YML,
  API_PREFIX,
  MOCKS_PATH,
  SKIP_VALIDATION,
  LOG,
  API_PORT,
  WATCH,
  proxyUrl
} from "./lib/globals";
import { print, clear } from "./lib/log";
import router from "./router";
import handleSigint from "./lib/handleSigint";

const port = API_PORT || "3000";

const init = async (app: Application): Promise<Server> =>
  new Promise(async (resolve, reject) => {
    try {
      app.set("trust proxy", true);

      const _router = await router();
      app.use(_router);

      const server = app.listen(port, () => {
        clear();
        print(`Server running at ${API_PROTOCOL}://${API_HOSTNAME}:${port}`);
        print({
          "Api yml": API_YML,
          "Api prefix": API_PREFIX,
          "Mock path": MOCKS_PATH,
          "Proxy URL": proxyUrl,
          "Validate responses": SKIP_VALIDATION ? "disabled" : "enabled",
          "Log requests": LOG ? "enabled" : "disabled",
          "Watch mode": WATCH ? "enabled" : "disabled"
        });
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
