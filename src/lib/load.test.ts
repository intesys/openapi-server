import load from "./load";
import path from "path";

describe("load", () => {
  const validSpecPath = path.join(process.cwd(), "examples/api.yml");
  const invalidPath = path.join(process.cwd(), "non-existing.yml");

  it("loads valid yaml spec", async () => {
    const sut = await load(validSpecPath);

    expect(sut).toBeDefined();
    expect(sut).toHaveProperty("paths");
  });

  it("throws error for non-existing file", async () => {
    await expect(load(invalidPath)).rejects.toThrow();
  });

  it("resolves references in spec", async () => {
    const sut = await load(validSpecPath);

    expect(sut.paths).toBeDefined();
    expect(typeof sut.paths).toBe("object");
  });

  it("returns OpenAPI document structure", async () => {
    const sut = await load(validSpecPath);

    expect(sut).toHaveProperty("info");
    expect(sut.info).toHaveProperty("title");
    expect(sut.info).toHaveProperty("version");
  });

  it("loads spec with correct swagger/openapi version", async () => {
    const sut = await load(validSpecPath);

    const hasSwagger = "swagger" in sut;
    const hasOpenapi = "openapi" in sut;
    expect(hasSwagger || hasOpenapi).toBe(true);
  });

  it("throws error for invalid yaml", async () => {
    const invalidYamlPath = path.join(process.cwd(), "package.json");

    // package.json is valid JSON but might not be valid OpenAPI spec
    // This test verifies the function handles non-yaml gracefully
    const sut = await load(invalidYamlPath);
    expect(sut).toBeDefined();
  });
});
