import { Application } from "express";
import fs from "fs";
import { Server } from "net";
import init from "./init";
import { specs } from "./lib/globals";
import { clear, print } from "./lib/log";

/**
 * Restarts the server on file changes
 */
export default (app: Application, server: Server) => {
  let restarting = false;
  let scheduleRestart = false;

  const restart = async () => {
    clear();
    print("Restarting server");
    server = await init(app);
    restarting = false;

    if (scheduleRestart) {
      scheduleRestart = false;
      onChange();
    }
  };

  const onChange = async () => {
    if (restarting) {
      scheduleRestart = true;
      return;
    }
    restarting = true;
    clear();
    print("Stopping server");
    server.close(restart);
  };

  Object.values(specs).forEach((item: string) => {
    fs.watch(item, {}, onChange);
  });
};
