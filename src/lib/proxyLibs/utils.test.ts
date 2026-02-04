import { filterHeaders } from "./utils";
import { IncomingHttpHeaders } from "http";

describe("filterHeaders", () => {
  it("filters out connection header", () => {
    const headers: IncomingHttpHeaders = {
      "content-type": "application/json",
      connection: "keep-alive",
    };

    const sut = filterHeaders(headers);

    expect(sut).not.toHaveProperty("connection");
    expect(sut).toHaveProperty("content-type", "application/json");
  });

  it("filters out transfer-encoding header", () => {
    const headers: IncomingHttpHeaders = {
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    };

    const sut = filterHeaders(headers);

    expect(sut).not.toHaveProperty("transfer-encoding");
  });

  it("filters out accept header", () => {
    const headers: IncomingHttpHeaders = {
      accept: "application/json",
      host: "localhost",
    };

    const sut = filterHeaders(headers);

    expect(sut).not.toHaveProperty("accept");
    expect(sut).toHaveProperty("host", "localhost");
  });

  it("filters out user-agent header", () => {
    const headers: IncomingHttpHeaders = {
      "user-agent": "Mozilla/5.0",
      host: "localhost",
    };

    const sut = filterHeaders(headers);

    expect(sut).not.toHaveProperty("user-agent");
  });

  it("preserves content-type header", () => {
    const headers: IncomingHttpHeaders = {
      "content-type": "application/json",
    };

    const sut = filterHeaders(headers);

    expect(sut).toHaveProperty("content-type", "application/json");
  });

  it("preserves authorization header", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer token123",
    };

    const sut = filterHeaders(headers);

    expect(sut).toHaveProperty("authorization", "Bearer token123");
  });

  it("preserves host header", () => {
    const headers: IncomingHttpHeaders = {
      host: "api.example.com",
    };

    const sut = filterHeaders(headers);

    expect(sut).toHaveProperty("host", "api.example.com");
  });

  it("handles empty headers", () => {
    const headers: IncomingHttpHeaders = {};

    const sut = filterHeaders(headers);

    expect(sut).toEqual({});
  });

  it("filters multiple proxy headers at once", () => {
    const headers: IncomingHttpHeaders = {
      accept: "application/json",
      "accept-encoding": "gzip",
      connection: "keep-alive",
      "content-type": "application/json",
      host: "localhost",
      "transfer-encoding": "chunked",
      "user-agent": "test",
    };

    const sut = filterHeaders(headers);

    expect(sut).not.toHaveProperty("accept");
    expect(sut).not.toHaveProperty("accept-encoding");
    expect(sut).not.toHaveProperty("connection");
    expect(sut).not.toHaveProperty("transfer-encoding");
    expect(sut).not.toHaveProperty("user-agent");
    expect(sut).toHaveProperty("content-type", "application/json");
    expect(sut).toHaveProperty("host", "localhost");
  });

  it("preserves custom headers", () => {
    const headers: IncomingHttpHeaders = {
      "x-custom-header": "custom-value",
      "x-api-key": "api-key-123",
    };

    const sut = filterHeaders(headers);

    expect(sut).toHaveProperty("x-custom-header", "custom-value");
    expect(sut).toHaveProperty("x-api-key", "api-key-123");
  });
});
