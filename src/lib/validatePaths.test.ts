import { OpenAPIV2, OpenAPIV3 } from "openapi-types";
import { validateSpecsOrThrow } from "./validatePaths";

describe("validatePaths", () => {
  describe("validateSpecsOrThrow", () => {
    describe("with V2 specs", () => {
      it("passes for non-conflicting paths", () => {
        const specs: OpenAPIV2.Document[] = [
          {
            swagger: "2.0",
            info: { title: "Test1", version: "1.0" },
            basePath: "/api",
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
          {
            swagger: "2.0",
            info: { title: "Test2", version: "1.0" },
            basePath: "/api",
            paths: {
              "/users": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
        ];

        expect(() => validateSpecsOrThrow(specs)).not.toThrow();
      });

      it("throws for conflicting paths with same method", () => {
        const specs: OpenAPIV2.Document[] = [
          {
            swagger: "2.0",
            info: { title: "Test1", version: "1.0" },
            basePath: "/api",
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
          {
            swagger: "2.0",
            info: { title: "Test2", version: "1.0" },
            basePath: "/api",
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
        ];

        expect(() => validateSpecsOrThrow(specs)).toThrow();
      });

      it("passes for same path with different methods", () => {
        const specs: OpenAPIV2.Document[] = [
          {
            swagger: "2.0",
            info: { title: "Test1", version: "1.0" },
            basePath: "/api",
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
          {
            swagger: "2.0",
            info: { title: "Test2", version: "1.0" },
            basePath: "/api",
            paths: {
              "/pets": {
                post: { responses: { "201": { description: "Created" } } },
              },
            },
          },
        ];

        expect(() => validateSpecsOrThrow(specs)).not.toThrow();
      });

      it("passes for same path with different basePaths", () => {
        const specs: OpenAPIV2.Document[] = [
          {
            swagger: "2.0",
            info: { title: "Test1", version: "1.0" },
            basePath: "/api/v1",
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
          {
            swagger: "2.0",
            info: { title: "Test2", version: "1.0" },
            basePath: "/api/v2",
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
        ];

        expect(() => validateSpecsOrThrow(specs)).not.toThrow();
      });
    });

    describe("with V3 specs", () => {
      it("passes for non-conflicting paths", () => {
        const specs: OpenAPIV3.Document[] = [
          {
            openapi: "3.0.0",
            info: { title: "Test1", version: "1.0" },
            servers: [{ url: "http://localhost/api" }],
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
          {
            openapi: "3.0.0",
            info: { title: "Test2", version: "1.0" },
            servers: [{ url: "http://localhost/api" }],
            paths: {
              "/users": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
        ];

        expect(() => validateSpecsOrThrow(specs)).not.toThrow();
      });

      it("throws for conflicting paths", () => {
        const specs: OpenAPIV3.Document[] = [
          {
            openapi: "3.0.0",
            info: { title: "Test1", version: "1.0" },
            servers: [{ url: "http://localhost/api" }],
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
          {
            openapi: "3.0.0",
            info: { title: "Test2", version: "1.0" },
            servers: [{ url: "http://localhost/api" }],
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
        ];

        expect(() => validateSpecsOrThrow(specs)).toThrow();
      });
    });

    describe("edge cases", () => {
      it("handles empty specs array", () => {
        expect(() => validateSpecsOrThrow([])).not.toThrow();
      });

      it("handles specs with empty paths", () => {
        const specs: OpenAPIV3.Document[] = [
          {
            openapi: "3.0.0",
            info: { title: "Test", version: "1.0" },
            paths: {},
          },
        ];

        expect(() => validateSpecsOrThrow(specs)).not.toThrow();
      });

      it("handles single spec", () => {
        const specs: OpenAPIV3.Document[] = [
          {
            openapi: "3.0.0",
            info: { title: "Test", version: "1.0" },
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
        ];

        expect(() => validateSpecsOrThrow(specs)).not.toThrow();
      });

      it("handles paths with parameters", () => {
        const specs: OpenAPIV3.Document[] = [
          {
            openapi: "3.0.0",
            info: { title: "Test1", version: "1.0" },
            paths: {
              "/pets/{petId}": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
          {
            openapi: "3.0.0",
            info: { title: "Test2", version: "1.0" },
            paths: {
              "/users/{userId}": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
        ];

        expect(() => validateSpecsOrThrow(specs)).not.toThrow();
      });

      it("returns true for valid specs", () => {
        const specs: OpenAPIV3.Document[] = [
          {
            openapi: "3.0.0",
            info: { title: "Test", version: "1.0" },
            paths: {
              "/pets": {
                get: { responses: { "200": { description: "OK" } } },
              },
            },
          },
        ];

        const result = validateSpecsOrThrow(specs);

        expect(result).toBe(true);
      });
    });
  });
});
