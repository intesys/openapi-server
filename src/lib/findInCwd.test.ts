import { findFileInCwd, findDirInCwd } from "./findInCwd";
import path from "path";

describe("findInCwd", () => {
  describe("findFileInCwd", () => {
    it("finds existing file from array", () => {
      const sut = findFileInCwd(["package.json"]);

      expect(sut).toContain("package.json");
      expect(path.isAbsolute(sut!)).toBe(true);
    });

    it("finds existing file from string", () => {
      const sut = findFileInCwd("package.json");

      expect(sut).toContain("package.json");
    });

    it("returns undefined for non-existing file", () => {
      const sut = findFileInCwd(["non-existing-file.xyz"]);

      expect(sut).toBeUndefined();
    });

    it("finds first matching file from array", () => {
      const sut = findFileInCwd(["non-existing.xyz", "package.json", "tsconfig.json"]);

      expect(sut).toContain("package.json");
    });

    it("returns undefined when no files match", () => {
      const sut = findFileInCwd(["non-existing-1.xyz", "non-existing-2.xyz"]);

      expect(sut).toBeUndefined();
    });

    it("does not return directories", () => {
      const sut = findFileInCwd(["src"]);

      expect(sut).toBeUndefined();
    });
  });

  describe("findDirInCwd", () => {
    it("finds existing directory", () => {
      const sut = findDirInCwd("src");

      expect(sut).toContain("src");
      expect(path.isAbsolute(sut!)).toBe(true);
    });

    it("returns undefined for non-existing directory", () => {
      const sut = findDirInCwd("non-existing-directory");

      expect(sut).toBeUndefined();
    });

    it("returns undefined for file path", () => {
      const sut = findDirInCwd("package.json");

      expect(sut).toBeUndefined();
    });

    it("finds nested directory", () => {
      const sut = findDirInCwd("src/lib");

      expect(sut).toContain("src");
      expect(sut).toContain("lib");
    });

    it("finds examples directory", () => {
      const sut = findDirInCwd("examples");

      expect(sut).toContain("examples");
    });
  });
});
