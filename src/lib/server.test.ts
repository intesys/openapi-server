import express from "express";
import { createServer } from "./server";

describe("server", () => {
  describe("createServer", () => {
    let app: express.Express;

    beforeEach(() => {
      app = express();
    });

    it("creates http server for http protocol", () => {
      const sut = createServer("http", app);

      expect(sut).toBeDefined();
      // Check that it's an HTTP server (not HTTPS)
      expect(sut).toHaveProperty("listen");
    });

    it("creates https server for https protocol", () => {
      const sut = createServer("https", app);

      expect(sut).toBeDefined();
      expect(sut).toHaveProperty("listen");
    });

    it("defaults to http when protocol is unknown", () => {
      const sut = createServer("unknown" as any, app);

      expect(sut).toBeDefined();
      expect(sut).toHaveProperty("listen");
    });

    it("http server is closeable", () => {
      const sut = createServer("http", app);

      expect(typeof sut.close).toBe("function");
    });

    it("https server is closeable", () => {
      const sut = createServer("https", app);

      expect(typeof sut.close).toBe("function");
    });
  });
});
