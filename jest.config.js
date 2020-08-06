"use strict";

// [prettierx]
const installPrettier = require("./scripts/install-prettierx");

const ENABLE_CODE_COVERAGE = !!process.env.ENABLE_CODE_COVERAGE;
if (process.env.NODE_ENV === "production") {
  // [prettierx]
  process.env.PRETTIERX_DIR = installPrettier();
}

module.exports = {
  setupFiles: ["<rootDir>/tests_config/run_spec.js"],
  snapshotSerializers: [
    "jest-snapshot-serializer-raw",
    "jest-snapshot-serializer-ansi",
  ],
  testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
  collectCoverage: ENABLE_CODE_COVERAGE,
  collectCoverageFrom: ["src/**/*.js", "index.js", "!<rootDir>/node_modules/"],
  coveragePathIgnorePatterns: [
    "<rootDir>/standalone.js",
    "<rootDir>/src/document/doc-debug.js",
    "<rootDir>/src/main/massage-ast.js",
  ],
  coverageReporters: ["text", "lcov"],
  moduleNameMapper: {
    // Jest wires `fs` to `graceful-fs`, which causes a memory leak when
    // `graceful-fs` does `require('fs')`.
    // Ref: https://github.com/facebook/jest/issues/2179#issuecomment-355231418
    // If this is removed, see also scripts/build/build.js.
    "graceful-fs": "<rootDir>/tests_config/fs.js",

    // [prettierx merge from prettier@2.0.5]
    "prettier/local": "<rootDir>/tests_config/require_prettierx.js",
    "prettier/standalone": "<rootDir>/tests_config/require_standalone.js",
  },
  testEnvironment: "node",
  transform: {},
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
