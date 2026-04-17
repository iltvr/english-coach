/** @type {import("jest").Config} **/
module.exports = {
  coveragePathIgnorePatterns: ["/node_modules/"],
  roots: ["<rootDir>"],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  setupFiles: ["<rootDir>/src/test-setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/src/__tests__/setup\\.js$"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { esModuleInterop: true } }],
  },
};
