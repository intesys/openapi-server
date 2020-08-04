import express, { Handler } from "express";
import Path from "path";

export default (dir: string): Handler =>
  express.static(Path.join(process.cwd(), dir));
