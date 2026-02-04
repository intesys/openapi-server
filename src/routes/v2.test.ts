import express from "express";
import fetch from "node-fetch";
import { OpenAPIV2 } from "openapi-types";
import buildV2Routes, { getV2BasePath } from "./v2";

jest.mock("./middlewares", () =>
  jest.fn((method: string, route: string) => [
    (req: express.Request, res: express.Response) => res.status(200).json({ method, route, path: req.path }),
  ])
);

const createApp = (router: express.Router) => {
  const app = express();
  app.use(router);
  app.use((req, res) => res.status(404).send("not-found"));

  const server = app.listen(0);
  const { port } = server.address() as any;
  const baseUrl = `http://127.0.0.1:${port}`;

  return {
    baseUrl,
    stop: () => new Promise((resolve) => server.close(resolve)),
  };
};

describe("V2 Routes", () => {
  describe("getV2BasePath", () => {
    it("returns basePath from spec", () => {
      const spec: OpenAPIV2.Document = {
        swagger: "2.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
        basePath: "/api/v2",
      };

      const sut = getV2BasePath(spec);

      expect(sut).toBe("/api/v2");
    });

    it("returns empty string when basePath is not defined", () => {
      const spec: OpenAPIV2.Document = {
        swagger: "2.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
      };

      const sut = getV2BasePath(spec);

      expect(sut).toBe("");
    });

    it("handles root basePath", () => {
      const spec: OpenAPIV2.Document = {
        swagger: "2.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
        basePath: "/",
      };

      const sut = getV2BasePath(spec);

      expect(sut).toBe("/");
    });

    it("handles nested basePath", () => {
      const spec: OpenAPIV2.Document = {
        swagger: "2.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
        basePath: "/api/v1/services",
      };

      const sut = getV2BasePath(spec);

      expect(sut).toBe("/api/v1/services");
    });
  });

  describe("buildV2Routes", () => {
    it("registers route with basePath and path params", async () => {
      const router = express.Router();
      const paths: OpenAPIV2.PathsObject = {
        "/pets/{petId}": {
          get: {
            responses: { "200": { description: "OK" } },
          },
        },
      };

      buildV2Routes(router, paths, "/api");
      const app = createApp(router);

      try {
        const res = await fetch(`${app.baseUrl}/api/pets/123`);
        const body = (await res.json()) as any;

        expect(res.status).toBe(200);
        expect(body.route).toBe("/api/pets/{petId}");
        expect(body.method).toBe("get");
        expect(body.path).toBe("/api/pets/123");
      } finally {
        await app.stop();
      }
    });

    it("omits routes for undefined operations", async () => {
      const router = express.Router();
      const paths: OpenAPIV2.PathsObject = {
        "/pets": {
          get: { responses: { "200": { description: "OK" } } },
        },
      };

      buildV2Routes(router, paths, "");
      const app = createApp(router);

      try {
        const res = await fetch(`${app.baseUrl}/pets`, { method: "POST" });
        expect(res.status).toBe(404);
        expect(await res.text()).toBe("not-found");
      } finally {
        await app.stop();
      }
    });

    it("registers multiple HTTP methods", async () => {
      const router = express.Router();
      const paths: OpenAPIV2.PathsObject = {
        "/pets": {
          get: { responses: { "200": { description: "OK" } } },
          post: { responses: { "201": { description: "Created" } } },
        },
      };

      buildV2Routes(router, paths, "/api");
      const app = createApp(router);

      try {
        const getRes = await fetch(`${app.baseUrl}/api/pets`);
        const postRes = await fetch(`${app.baseUrl}/api/pets`, { method: "POST" });

        expect(getRes.status).toBe(200);
        expect(postRes.status).toBe(200);
      } finally {
        await app.stop();
      }
    });
  });
});
