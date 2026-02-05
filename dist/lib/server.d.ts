import https from "https";
import http from "http";
import { HTTPProtocol } from "../types/env";
import { Express } from "express";
export declare const createServer: (protocol: HTTPProtocol, app: Express) => https.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
