import validate from "./validate";

describe("validate", () => {
  describe("string validation", () => {
    const stringSchema = { type: "string" as const };

    it("validates valid string", () => {
      const sut = validate(stringSchema, "test");

      expect(sut).toBe(true);
    });

    it("throws for number instead of string", () => {
      expect(() => validate(stringSchema, 123)).toThrow();
    });

    it("throws for object instead of string", () => {
      expect(() => validate(stringSchema, { key: "value" })).toThrow();
    });

    it("throws for array instead of string", () => {
      expect(() => validate(stringSchema, ["a", "b"])).toThrow();
    });
  });

  describe("number validation", () => {
    const numberSchema = { type: "number" as const };

    it("validates valid number", () => {
      const sut = validate(numberSchema, 42);

      expect(sut).toBe(true);
    });

    it("validates decimal number", () => {
      const sut = validate(numberSchema, 3.14);

      expect(sut).toBe(true);
    });

    it("throws for string instead of number", () => {
      expect(() => validate(numberSchema, "42")).toThrow();
    });
  });

  describe("boolean validation", () => {
    const booleanSchema = { type: "boolean" as const };

    it("validates true", () => {
      const sut = validate(booleanSchema, true);

      expect(sut).toBe(true);
    });

    it("validates false", () => {
      const sut = validate(booleanSchema, false);

      expect(sut).toBe(true);
    });

    it("throws for string instead of boolean", () => {
      expect(() => validate(booleanSchema, "true")).toThrow();
    });
  });

  describe("object validation", () => {
    const objectSchema = {
      type: "object" as const,
      properties: {
        name: { type: "string" as const },
        age: { type: "number" as const },
      },
      required: ["name"],
    };

    it("validates valid object", () => {
      const sut = validate(objectSchema, { name: "John", age: 30 });

      expect(sut).toBe(true);
    });

    it("validates object with required field only", () => {
      const sut = validate(objectSchema, { name: "John" });

      expect(sut).toBe(true);
    });

    it("throws for missing required field", () => {
      expect(() => validate(objectSchema, { age: 30 })).toThrow();
    });

    it("throws for invalid type", () => {
      expect(() => validate(objectSchema, "not an object")).toThrow();
    });

    it("throws for wrong property type", () => {
      expect(() => validate(objectSchema, { name: 123 })).toThrow();
    });
  });

  describe("array validation", () => {
    const arraySchema = {
      type: "array" as const,
      items: { type: "string" as const },
    };

    it("validates valid array", () => {
      const sut = validate(arraySchema, ["a", "b", "c"]);

      expect(sut).toBe(true);
    });

    it("validates empty array", () => {
      const sut = validate(arraySchema, []);

      expect(sut).toBe(true);
    });

    it("throws for invalid array items", () => {
      expect(() => validate(arraySchema, [1, 2, 3])).toThrow();
    });

    it("throws for non-array type", () => {
      expect(() => validate(arraySchema, { not: "array" })).toThrow();
    });
  });

  describe("nested object validation", () => {
    const nestedSchema = {
      type: "object" as const,
      properties: {
        user: {
          type: "object" as const,
          properties: {
            name: { type: "string" as const },
          },
          required: ["name"],
        },
      },
      required: ["user"],
    };

    it("validates valid nested object", () => {
      const sut = validate(nestedSchema, { user: { name: "John" } });

      expect(sut).toBe(true);
    });

    it("throws for invalid nested object", () => {
      expect(() => validate(nestedSchema, { user: { name: 123 } })).toThrow();
    });
  });
});
