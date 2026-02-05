module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  setupFiles: ["<rootDir>/src/testSetup.ts"],
};
