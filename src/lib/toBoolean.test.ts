import toBoolean, { fixBooleans } from "./toBoolean";

describe("toBoolean", () => {
  describe("toBoolean", () => {
    it("converts falsy strings", () => {
      const input = "false";
      const sut = toBoolean(input);

      expect(sut).toBeFalsy();
    });

    it("converts truthy strings", () => {
      const input = "true";
      const sut = toBoolean(input);

      expect(sut).toBeTruthy();
    });
  });

  describe("fixBooleans", () => {
    it("converts booelans", () => {
      const booleans = ["boolean"];
      const input = {
        nonBoolean: "string",
        boolean: "true"
      };
      const sut = fixBooleans(input, booleans);

      expect(sut).toMatchObject({ nonBoolean: "string", boolean: true });
    });
  });
});
