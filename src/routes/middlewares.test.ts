/* eslint-disable @typescript-eslint/no-var-requires */
describe("Middlewares", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.unmock("../lib/globals");
  });

  it("skip validation middleware if SKIP_VALIDATION is true", () => {
    jest.mock("../lib/globals", () => ({
      MOCKS: true,
      PROXY: true,
      SKIP_VALIDATION: true,
    }));
    const middlewares = require("./middlewares").default;
    const sut = middlewares("str", "str", {});

    expect(sut.length).toEqual(3);
  });

  it("skip mocks middleware if MOCKS is false", () => {
    jest.mock("../lib/globals", () => ({
      MOCKS: false,
      PROXY: true,
      SKIP_VALIDATION: false,
    }));
    const middlewares = require("./middlewares").default;
    const sut = middlewares("str", "str", {});

    expect(sut.length).toEqual(3);
  });

  it("skip proxy middleware if PROXY is false", () => {
    jest.mock("../lib/globals", () => ({
      MOCKS: true,
      PROXY: false,
      SKIP_VALIDATION: false,
    }));
    const middlewares = require("./middlewares").default;
    const sut = middlewares("str", "str", {});

    expect(sut.length).toEqual(3);
  });

  it("uses all middlewares if enabled", () => {
    jest.mock("../lib/globals", () => ({
      MOCKS: true,
      PROXY: true,
      SKIP_VALIDATION: false,
    }));
    const middlewares = require("./middlewares").default;
    const sut = middlewares("str", "str", {});

    expect(sut.length).toEqual(4);
  });
});
