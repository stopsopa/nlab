module.exports = async () => {
  return {
    verbose: true,
    collectCoverage: true,
    bail: true,
    coverageReporters: ["html", "lcov", "text"],
    collectCoverageFrom: ["src/**/*.{js,jsx}"],
  };
};
