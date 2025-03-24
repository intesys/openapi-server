module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
};
