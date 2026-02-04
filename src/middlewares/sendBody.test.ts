import sendBody from "./sendBody";
import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";
import { Request, Response } from "express";

describe("sendBody", () => {
  it("sends body when locals.body is set with object", () => {
    const middleware = sendBody();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    res.locals = { body: { data: "test" } };
    const sendSpy = jest.spyOn(res, "send");

    middleware(req, res, next);

    expect(sendSpy).toHaveBeenCalledWith({ data: "test" });
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next when locals.body is undefined", () => {
    const middleware = sendBody();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    res.locals = {};

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("handles string body", () => {
    const middleware = sendBody();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    res.locals = { body: "string response" };
    const sendSpy = jest.spyOn(res, "send");

    middleware(req, res, next);

    expect(sendSpy).toHaveBeenCalledWith("string response");
    expect(next).not.toHaveBeenCalled();
  });

  it("handles array body", () => {
    const middleware = sendBody();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    res.locals = { body: [1, 2, 3] };
    const sendSpy = jest.spyOn(res, "send");

    middleware(req, res, next);

    expect(sendSpy).toHaveBeenCalledWith([1, 2, 3]);
  });

  it("handles null body", () => {
    const middleware = sendBody();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    res.locals = { body: null };
    const sendSpy = jest.spyOn(res, "send");

    middleware(req, res, next);

    expect(sendSpy).toHaveBeenCalledWith(null);
  });

  it("handles empty string body", () => {
    const middleware = sendBody();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    res.locals = { body: "" };
    const sendSpy = jest.spyOn(res, "send");

    middleware(req, res, next);

    expect(sendSpy).toHaveBeenCalledWith("");
  });

  it("handles number zero as body", () => {
    const middleware = sendBody();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    res.locals = { body: 0 };
    const sendSpy = jest.spyOn(res, "send");

    middleware(req, res, next);

    expect(sendSpy).toHaveBeenCalledWith(0);
  });

  it("handles boolean false as body", () => {
    const middleware = sendBody();
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    res.locals = { body: false };
    const sendSpy = jest.spyOn(res, "send");

    middleware(req, res, next);

    expect(sendSpy).toHaveBeenCalledWith(false);
  });
});
