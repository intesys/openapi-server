import { RemoteError } from "./proxy";

describe("proxy", () => {
  describe("RemoteError", () => {
    it("creates RemoteError with source and error", () => {
      const source = "GET http://example.com/api";
      const error = { status: 500, data: "Internal Server Error" };

      const sut = new RemoteError(source, error);

      expect(sut.source).toBe(source);
      expect(sut.error).toBe(error);
      expect(sut._remote).toBe(true);
    });

    it("marks error as remote", () => {
      const sut = new RemoteError("source", {});

      expect(sut._remote).toBe(true);
    });

    it("handles string error", () => {
      const sut = new RemoteError("source", "Error message");

      expect(sut.error).toBe("Error message");
    });

    it("handles Error object", () => {
      const error = new Error("Network error");
      const sut = new RemoteError("source", error);

      expect(sut.error).toBe(error);
      expect(sut.error.message).toBe("Network error");
    });

    it("handles error with response data", () => {
      const error = {
        status: 404,
        data: { message: "Not found" },
        headers: { "content-type": "application/json" },
      };
      const sut = new RemoteError("GET /api/resource", error);

      expect(sut.error.status).toBe(404);
      expect(sut.error.data).toEqual({ message: "Not found" });
      expect(sut.error.headers).toEqual({ "content-type": "application/json" });
    });
  });
});
