import getPrefix from "./getPrefix";

describe("getPrefix", () => {
  it("returns prefix with leading slash when prefix has leading slash", () => {
    const sut = getPrefix("/api");

    expect(sut).toBe("/api");
  });

  it("adds leading slash if missing", () => {
    const sut = getPrefix("api");

    expect(sut).toBe("/api");
  });

  it("returns empty string for undefined", () => {
    const sut = getPrefix(undefined);

    expect(sut).toBe("");
  });

  it("returns empty string for empty string", () => {
    const sut = getPrefix("");

    expect(sut).toBe("");
  });

  it("handles nested prefix", () => {
    const sut = getPrefix("/api/v1");

    expect(sut).toBe("/api/v1");
  });

  it("handles nested prefix without leading slash", () => {
    const sut = getPrefix("api/v1");

    expect(sut).toBe("/api/v1");
  });
});
