import fs from "fs";
import { API_YML } from "./lib/globals";
import { Application } from "express";
import { Server } from "net";
import { print, clear } from "./lib/log";
import init from "./init";
import { ISourceYml } from "./types/env";

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

  Object.values(API_YML).forEach((item: ISourceYml) => {
    fs.watch(item.path, {}, onChange);
  });
};
