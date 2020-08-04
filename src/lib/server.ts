import https from "https";
import http from "http";
import fs from "fs";
import Path from "path";
import { HTTPProtocol } from "../types/env";
import { Express } from "express";

export const createServer = (
  protocol: HTTPProtocol,
  app: Express
): https.Server | http.Server => {
  switch (protocol) {
    case HTTPProtocol.https:
      return createHttps(app);
    case HTTPProtocol.http:
    default:
      return createHttp(app);
  }
};

const createHttp = (app: Express) => http.createServer(app);

const createHttps = (app: Express) =>
  https.createServer(
    {
      key: fs.readFileSync(Path.join(__dirname, "../../cert/server.key")),
      cert: fs.readFileSync(Path.join(__dirname, "../../cert/server.cert")),
    },
    app
  );
