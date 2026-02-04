import { OpenAPIV2, OpenAPIV3 } from "openapi-types";
import routes, { operations } from "./routes";
import buildV2Routes, { getV2BasePath } from "./routes/v2";
import buildV3Routes, { getV3BasePath } from "./routes/v3";

jest.mock("./routes/v2", () => ({
  __esModule: true,
  default: jest.fn(() => "v2-router"),
  getV2BasePath: jest.fn(() => "/baseV2"),
}));

jest.mock("./routes/v3", () => ({
  __esModule: true,
  default: jest.fn(() => "v3-router"),
  getV3BasePath: jest.fn(() => "/baseV3"),
}));

const mockedBuildV2Routes = buildV2Routes as jest.Mock;
const mockedGetV2BasePath = getV2BasePath as jest.Mock;
const mockedBuildV3Routes = buildV3Routes as jest.Mock;
const mockedGetV3BasePath = getV3BasePath as jest.Mock;

describe("routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("operations", () => {
    it("contains get method", () => {
      expect(operations).toHaveProperty("get", "get");
    });

    it("contains put method", () => {
      expect(operations).toHaveProperty("put", "put");
    });

    it("contains post method", () => {
      expect(operations).toHaveProperty("post", "post");
    });

    it("contains delete method", () => {
      expect(operations).toHaveProperty("delete", "delete");
    });

    it("contains options method", () => {
      expect(operations).toHaveProperty("options", "options");
    });

    it("contains head method", () => {
      expect(operations).toHaveProperty("head", "head");
    });

    it("contains patch method", () => {
      expect(operations).toHaveProperty("patch", "patch");
    });

    it("has delete alias as del", () => {
      expect(operations).toHaveProperty("del", "delete");
    });

    it("does not contain non-HTTP methods", () => {
      expect(operations).not.toHaveProperty("connect");
      expect(operations).not.toHaveProperty("trace");
    });
  });

  describe("routes factory", () => {
    describe("with V2 spec", () => {
      it("delegates to V2 builder with computed base path", () => {
        const spec: OpenAPIV2.Document = {
          swagger: "2.0",
          info: { title: "Test", version: "1.0" },
          basePath: "/api/v2",
          paths: {
            "/users": {
              get: {
                responses: { "200": { description: "OK" } },
              },
            },
          },
        };

        const result = routes(spec);

        expect(mockedGetV2BasePath).toHaveBeenCalledWith(spec);
        expect(mockedBuildV2Routes).toHaveBeenCalledWith(expect.anything(), spec.paths, "/baseV2");
        expect(result).toBe("v2-router");
      });
    });

    describe("with V3 spec", () => {
      it("delegates to V3 builder with computed base path", () => {
        const spec: OpenAPIV3.Document = {
          openapi: "3.0.0",
          info: { title: "Test", version: "1.0" },
          servers: [{ url: "http://localhost:3000/api/v3" }],
          paths: {
            "/users": {
              get: {
                responses: { "200": { description: "OK" } },
              },
            },
          },
        };

        const result = routes(spec);

        expect(mockedGetV3BasePath).toHaveBeenCalledWith(spec);
        expect(mockedBuildV3Routes).toHaveBeenCalledWith(expect.anything(), spec.paths, "/baseV3");
        expect(result).toBe("v3-router");
      });
    });

    describe("with invalid spec", () => {
      it("throws error for unsupported version", () => {
        const spec = {
          // Missing swagger or openapi field
          info: { title: "Test", version: "1.0" },
          paths: {},
        } as any;

        expect(() => routes(spec)).toThrow("Unsupported openApi schema version");
      });
    });
  });
});
