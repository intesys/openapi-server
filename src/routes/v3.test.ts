import express from "express";
import fetch from "node-fetch";
import { OpenAPIV3 } from "openapi-types";
import buildV3Routes, { getV3BasePath } from "./v3";

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

describe("V3 Routes", () => {
  describe("getV3BasePath", () => {
    it("returns path from first server", () => {
      const spec: OpenAPIV3.Document = {
        openapi: "3.0.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
        servers: [{ url: "http://localhost:3000/api/v3" }],
      };

      const sut = getV3BasePath(spec);

      expect(sut).toBe("/api/v3");
    });

    it("returns empty string when no servers defined", () => {
      const spec: OpenAPIV3.Document = {
        openapi: "3.0.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
      };

      const sut = getV3BasePath(spec);

      expect(sut).toBe("");
    });

    it("handles server with only path (no host)", () => {
      const spec: OpenAPIV3.Document = {
        openapi: "3.0.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
        servers: [{ url: "/api/v3" }],
      };

      const sut = getV3BasePath(spec);

      expect(sut).toBe("/api/v3");
    });

    it("handles server variables", () => {
      const spec: OpenAPIV3.Document = {
        openapi: "3.0.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
        servers: [
          {
            url: "http://localhost:{port}/{basePath}",
            variables: {
              port: { default: "3000" },
              basePath: { default: "api" },
            },
          },
        ],
      };

      const sut = getV3BasePath(spec);

      expect(sut).toContain("api");
    });

    it("uses first server when multiple servers defined", () => {
      const spec: OpenAPIV3.Document = {
        openapi: "3.0.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
        servers: [{ url: "http://localhost:3000/api/v1" }, { url: "http://localhost:3000/api/v2" }],
      };

      const sut = getV3BasePath(spec);

      expect(sut).toBe("/api/v1");
    });

    it("handles HTTPS URL", () => {
      const spec: OpenAPIV3.Document = {
        openapi: "3.0.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
        servers: [{ url: "https://api.example.com/v1" }],
      };

      const sut = getV3BasePath(spec);

      expect(sut).toBe("/v1");
    });

    it("handles root URL path", () => {
      const spec: OpenAPIV3.Document = {
        openapi: "3.0.0",
        info: { title: "Test", version: "1.0" },
        paths: {},
        servers: [{ url: "http://localhost:3000/" }],
      };

      const sut = getV3BasePath(spec);

      expect(sut).toBe("/");
    });
  });

  describe("buildV3Routes", () => {
    it("registers route with basePath and path params", async () => {
      const router = express.Router();
      const paths: Record<string, OpenAPIV3.PathItemObject> = {
        "/pets/{petId}": {
          get: {
            responses: {
              "200": { description: "OK" },
            },
          },
        },
      };

      buildV3Routes(router, paths, "/api");
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

    it("skips undefined operation methods", async () => {
      const router = express.Router();
      const paths: Record<string, OpenAPIV3.PathItemObject> = {
        "/pets": {
          get: { responses: { "200": { description: "OK" } } },
        },
      };

      buildV3Routes(router, paths, "");
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
      const paths: Record<string, OpenAPIV3.PathItemObject> = {
        "/pets": {
          get: { responses: { "200": { description: "OK" } } },
          post: { responses: { "201": { description: "Created" } } },
        },
      };

      buildV3Routes(router, paths, "/api");
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
