import voidMiddleware from "./void";
import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";
import { Request, Response } from "express";

describe("voidMiddleware", () => {
  it("calls next without arguments", () => {
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    voidMiddleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("does not modify request", () => {
    const req: Request = new MockExpressRequest({
      method: "GET",
      url: "/test",
    });
    const res: Response = new MockExpressResponse();
    const next = jest.fn();
    const originalUrl = req.url;
    const originalMethod = req.method;

    voidMiddleware(req, res, next);

    expect(req.url).toBe(originalUrl);
    expect(req.method).toBe(originalMethod);
  });

  it("does not send response", () => {
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    const sendSpy = jest.spyOn(res, "send");

    voidMiddleware(req, res, next);

    expect(sendSpy).not.toHaveBeenCalled();
  });

  it("does not modify response locals", () => {
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    res.locals = { existing: "data" };

    voidMiddleware(req, res, next);

    expect(res.locals).toEqual({ existing: "data" });
  });

  it("is a passthrough middleware", () => {
    const req: Request = new MockExpressRequest({
      method: "POST",
      url: "/api/users",
      body: { name: "test" },
    });
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    voidMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.body).toEqual({ name: "test" });
  });
});
