import express from "express";
import Path from "path";
import { ROOT_DIR } from "../lib/globals";

export default (dir: string) => express.static(Path.join(ROOT_DIR, dir));
