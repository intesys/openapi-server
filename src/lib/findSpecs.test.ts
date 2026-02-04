import { findSpecs } from "./findSpecs";

describe("findSpecs", () => {
  it("finds yaml file by direct path", () => {
    const sut = findSpecs("examples/api.yml");

    expect(sut.length).toBeGreaterThan(0);
    expect(sut[0]).toContain("api.yml");
  });

  it("finds yaml files in directory", () => {
    const sut = findSpecs("examples/api");

    expect(sut.length).toBeGreaterThan(0);
    sut.forEach((file) => {
      expect(file).toMatch(/\.(yml|yaml)$/i);
    });
  });

  it("handles comma-separated list of files", () => {
    const sut = findSpecs("examples/api.yml,examples/api/pets.yaml");

    expect(sut.length).toBeGreaterThanOrEqual(2);
  });

  it("handles comma-separated list with directory", () => {
    const sut = findSpecs("examples/api.yml,examples/api");

    expect(sut.length).toBeGreaterThan(1);
  });

  it("returns empty array for non-existing path", () => {
    const sut = findSpecs("non-existing-path");

    expect(sut).toEqual([]);
  });

  it("returns empty array for non-existing file", () => {
    const sut = findSpecs("non-existing-file.yml");

    expect(sut).toEqual([]);
  });

  it("finds files with .yml extension", () => {
    const sut = findSpecs("examples/api.yml");

    expect(sut.length).toBeGreaterThan(0);
    expect(sut[0]).toMatch(/\.yml$/);
  });

  it("finds files with .yaml extension", () => {
    const sut = findSpecs("examples/api");

    const yamlFiles = sut.filter((f) => f.endsWith(".yaml"));
    expect(yamlFiles.length).toBeGreaterThan(0);
  });

  it("finds nested yaml files in subdirectories", () => {
    const sut = findSpecs("examples/api");

    const nestedFiles = sut.filter((f) => f.includes("sub_dir"));
    expect(nestedFiles.length).toBeGreaterThan(0);
  });

  it("handles paths with whitespace after comma", () => {
    const sut = findSpecs("examples/api.yml, examples/api/pets.yaml");

    expect(sut.length).toBeGreaterThanOrEqual(2);
  });
});
