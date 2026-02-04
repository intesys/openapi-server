import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import handleStatic from "./handleStatic";

const startApp = (staticPath: string) => {
  const app = express();
  app.use(handleStatic(staticPath));
  app.use((req, res) => res.status(404).send("not-found"));

  const server = app.listen(0);
  const { port } = server.address() as any;
  const baseUrl = `http://127.0.0.1:${port}`;

  return {
    baseUrl,
    stop: () => new Promise((resolve) => server.close(resolve)),
  };
};

describe("handleStatic", () => {
  it("serves an existing file", async () => {
    const filePath = path.join(process.cwd(), "examples/static/file");
    const expectedBody = fs.readFileSync(filePath, "utf8");
    const app = startApp("examples/static");

    try {
      const res = await fetch(`${app.baseUrl}/file`);
      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toBe(expectedBody);
    } finally {
      await app.stop();
    }
  });

  it("falls through with 404 for missing file", async () => {
    const app = startApp("examples/static");
    try {
      const res = await fetch(`${app.baseUrl}/missing-file`);
      expect(res.status).toBe(404);
      expect(await res.text()).toBe("not-found");
    } finally {
      await app.stop();
    }
  });

  it("serves nested paths from subdirectories", async () => {
    const filePath = path.join(process.cwd(), "examples/mocks/pets/get.json");
    const expectedBody = fs.readFileSync(filePath, "utf8");
    const app = startApp("examples/mocks");

    try {
      const res = await fetch(`${app.baseUrl}/pets/get.json`);
      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toBe(expectedBody);
    } finally {
      await app.stop();
    }
  });
});
