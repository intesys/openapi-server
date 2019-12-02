import express from "express";
import Path from "path";

export default (dir: string) => express.static(Path.join(process.cwd(), dir));
