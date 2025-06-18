const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
 module.exports = {
  coveragePathIgnorePatterns: ["/node_modules/"],
  roots: ["<rootDir>"],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    ...tsJestTransformCfg,
  },
};
// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// export default {
//   testEnvironment: "node",
//   transform: {
//     ...tsJestTransformCfg,
//   },
// };

/* eslint-disable */

// const { pathsToModuleNameMapper } = require("ts-jest");
// const { compilerOptions } = require("./tsconfig");

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   coveragePathIgnorePatterns: ["/node_modules/"],
//   roots: ["<rootDir>"],
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   modulePaths: [compilerOptions.baseUrl],
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths ?? {}),
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//     ".+\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2|svg)$": "jest-transform-stub",
//   },
// };
