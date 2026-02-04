import getPort from "./getPort";

describe("getPort", () => {
  it("returns port with colon prefix", () => {
    const sut = getPort("3000");

    expect(sut).toBe(":3000");
  });

  it("returns empty string for undefined", () => {
    const sut = getPort(undefined);

    expect(sut).toBe("");
  });

  it("returns empty string for empty string", () => {
    const sut = getPort("");

    expect(sut).toBe("");
  });

  it("handles different port numbers", () => {
    const sut = getPort("8080");

    expect(sut).toBe(":8080");
  });

  it("handles standard HTTPS port", () => {
    const sut = getPort("443");

    expect(sut).toBe(":443");
  });
});
