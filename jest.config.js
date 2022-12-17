module.exports = async () => {
  return {
    verbose: true,
    collectCoverage: true,
    bail: true,
    coverageReporters: ["html", "lcov", "text"],
    collectCoverageFrom: ["src/**/*.{js,jsx}"],
    snapshotResolver: "./jest.snapshotResolver.js",
    watchPathIgnorePatterns: [".snap.js$"],
    coverageDirectory: "<rootDir>/docs",
  };
};
