import joinUrl from "./joinUrl";

describe("joinUrl", () => {
  it("joins two path segments", () => {
    const sut = joinUrl("/base", "/path");

    expect(sut).toBe("/base/path");
  });

  it("joins multiple path segments", () => {
    const sut = joinUrl("/base", "middle", "end");

    expect(sut).toBe("/base/middle/end");
  });

  it("handles trailing slash on base", () => {
    const sut = joinUrl("/base/", "/path");

    expect(sut).toBe("/base/path");
  });

  it("handles missing leading slash on path", () => {
    const sut = joinUrl("/base", "path");

    expect(sut).toBe("/base/path");
  });

  it("handles empty segments", () => {
    const sut = joinUrl("/base", "", "path");

    expect(sut).toBe("/base/path");
  });

  it("handles single path", () => {
    const sut = joinUrl("/single");

    expect(sut).toBe("/single");
  });

  it("handles root paths", () => {
    const sut = joinUrl("/", "/path");

    expect(sut).toBe("/path");
  });

  it("normalizes multiple slashes", () => {
    const sut = joinUrl("/base//", "//path");

    expect(sut).toBe("/base/path");
  });

  it("handles paths with parameters", () => {
    const sut = joinUrl("/api", "/users/{userId}");

    expect(sut).toBe("/api/users/{userId}");
  });
});
