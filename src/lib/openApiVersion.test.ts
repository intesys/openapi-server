import openApiVersion from "./openApiVersion";
import Version from "../types/openApiVersion";

describe("openApiVersion", () => {
  const v2 = {
    swagger: "2.0",
  };

  const v3 = {
    openapi: "3.0.0",
  };

  const invalidV2 = {
    swagger: "3.0.0",
  };

  const invalidV3 = {
    openapi: "2.0",
  };

  const numericV2 = {
    swagger: 2,
  };

  const numericV3 = {
    openapi: 3,
  };

  it("handles vesion 2", () => {
    const sut = openApiVersion(v2);
    expect(sut).toBe(Version.v2);
  });

  it("handles version 3", () => {
    const sut = openApiVersion(v3);
    expect(sut).toBe(Version.v3);
  });

  it("throws on invalid v2", () => {
    expect(() => openApiVersion(invalidV2)).toThrow();
  });

  it("throws on invalid v3", () => {
    expect(() => openApiVersion(invalidV3)).toThrow();
  });

  it("handles numeric version 2", () => {
    const sut = openApiVersion(numericV2);
    expect(sut).toBe(Version.v2);
  });

  it("handles numeric version 3", () => {
    const sut = openApiVersion(numericV3);
    expect(sut).toBe(Version.v3);
  });
});
