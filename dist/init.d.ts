/**
 * Given an express instance:
 * - configures the router
 * - starts server
 * - returns the server
 */
import { Express } from "express";
import { Server } from "net";
declare const init: (app: Express) => Promise<Server>;
export default init;
