import findUp from "./findUp";

describe("findUp", () => {
  it("works with single file", () => {
    const search = ".env";
    const startDir = __dirname;
    const sut = findUp(search, startDir);

    expect(sut).toMatch(/.env$/);
  });

  it("works with an array of files", () => {
    const search = [".env.dev", ".env"];
    const startDir = __dirname;
    const sut = findUp(search, startDir);

    expect(sut).toMatch(/.env$/);
  });

  it("return undefuned if file is not found", () => {
    const search = [".env.dev"];
    const startDir = __dirname;
    const sut = findUp(search, startDir);

    expect(sut).toBeUndefined();
  });
});
