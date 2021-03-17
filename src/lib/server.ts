import https from "https";
import http from "http";
import fs from "fs";
import Path from "path";
import { HTTPProtocol } from "../types/env";
import { Express } from "express";

export const createServer = (protocol: HTTPProtocol, app: Express) => {
  switch (protocol) {
    case "https":
      return createHttps(app);
    case "http":
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
