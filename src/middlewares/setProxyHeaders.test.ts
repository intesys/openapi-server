import setProxyHeaders from "./setProxyHeaders";
import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";
import { Request, Response } from "express";

describe("setProxyHeaders", () => {
  it("sets Via header and calls next exactly once", () => {
    const middleware = setProxyHeaders();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.getHeader("Via")).toBe("HTTP/1.1 openapi-server");
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("preserves existing headers while adding Via", () => {
    const middleware = setProxyHeaders();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    res.setHeader("content-type", "application/json");
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.getHeader("Via")).toBe("HTTP/1.1 openapi-server");
    expect(res.getHeader("content-type")).toBe("application/json");
    expect(next).toHaveBeenCalledTimes(1);
  });
});
