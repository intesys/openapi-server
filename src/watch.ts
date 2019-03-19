/**
 * Restarts the server on file changes
 */

import fs from 'fs';
import { API_YML, MOCKS_PATH } from './lib/globals';
import { Application } from 'express';
import { Server } from 'net';
import { print, clear } from './lib/log';
import init from './init';

export default (app: Application, server: Server) => {

  let restarting = false;
  let scheduleRestart = false;

  const restart = async () => {
    clear();
    print('Restarting server');
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
    print('Stopping server');
    server.close(restart);
  };

  fs.watch(API_YML, {}, onChange);

  fs.watch(MOCKS_PATH, { recursive: true }, onChange);

}
