import tryMock from "./tryMock";
import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";
import { Request, Response } from "express";

describe("TryMock", () => {
  describe("json", () => {
    it("passes if json is valid", () => {
      const sut = tryMock("get", "routes/{routeId}/sub/action");
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      sut(req, res, next);

      expect(next).toBeCalled();
    });

    it("passes if json is not found", () => {
      const sut = tryMock("get", "routes/{routeId}");
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      sut(req, res, next);

      expect(next).toBeCalled();
    });

    it("throws if json is invalid", () => {
      const sut = tryMock("get", "__test__/invalid");
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();
      sut(req, res, next);

      const expectedErrorMessage =
        "SyntaxError: Unexpected token } in JSON at position 19";
      expect(next).toBeCalledWith(new Error(expectedErrorMessage));
    });
  });

  describe("express middleware", () => {
    it("calls the middleware", () => {
      const BY_MIDDLEWARE = "by middleware";
      jest.doMock("../../mocks/__test__/middleware/get.js", () =>
        jest.fn((req, res, next) => next(BY_MIDDLEWARE))
      );
      const sut = tryMock("get", "__test__/middleware");
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();
      sut(req, res, next);

      expect(next).toBeCalledWith(BY_MIDDLEWARE);
    });
  });
});
