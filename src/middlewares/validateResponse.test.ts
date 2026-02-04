import validateResponse from "./validateResponse";
import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";
import { Request, Response } from "express";
import { OperationObject } from "../types/openApi";

describe("validateResponse", () => {
  describe("with swagger v2 spec", () => {
    const v2OperationSpec: OperationObject = {
      responses: {
        "200": {
          description: "OK",
          schema: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            },
            required: ["id", "name"],
          },
        },
      },
    };

    it("calls next when validation passes", () => {
      const middleware = validateResponse(v2OperationSpec);
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      res.locals = { body: { id: 1, name: "test" } };

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });

    it("calls next with error when validation fails", () => {
      const middleware = validateResponse(v2OperationSpec);
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      res.locals = { body: { id: "not-a-number", name: "test" } };

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it("calls next with error for missing required field", () => {
      const middleware = validateResponse(v2OperationSpec);
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      res.locals = { body: { id: 1 } };

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("with openapi v3 spec", () => {
    const v3OperationSpec: OperationObject = {
      responses: {
        "200": {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: { type: "string" },
                },
              },
            },
          },
        },
      },
    };

    it("calls next when validation passes", () => {
      const middleware = validateResponse(v3OperationSpec);
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      res.locals = { body: { data: "test" } };

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("with no schema", () => {
    const noSchemaSpec: OperationObject = {
      responses: {
        "200": {
          description: "OK",
        },
      },
    };

    it("calls next when no body is set", () => {
      const middleware = validateResponse(noSchemaSpec);
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      res.locals = {};

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("calls next when body is set but no schema defined", () => {
      const middleware = validateResponse(noSchemaSpec);
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      res.locals = { body: { any: "data" } };

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("with default response", () => {
    const defaultResponseSpec: OperationObject = {
      responses: {
        default: {
          description: "Default response",
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    };

    it("validates against default response schema", () => {
      const middleware = validateResponse(defaultResponseSpec);
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      res.locals = { body: { message: "hello" } };

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("with array response", () => {
    const arrayResponseSpec: OperationObject = {
      responses: {
        "200": {
          description: "OK",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
              },
            },
          },
        },
      },
    };

    it("validates array response", () => {
      const middleware = validateResponse(arrayResponseSpec);
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      res.locals = { body: [{ id: 1 }, { id: 2 }] };

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });

    it("fails validation for invalid array items", () => {
      const middleware = validateResponse(arrayResponseSpec);
      const req: Request = new MockExpressRequest();
      const res: Response = new MockExpressResponse();
      const next = jest.fn();

      res.locals = { body: [{ id: "not-a-number" }] };

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
