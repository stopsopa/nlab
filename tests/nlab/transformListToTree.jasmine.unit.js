const transformListToTree = require("../../transformListToTree");

describe("Test transformListToTree", () => {
  it("should transform a flat list into a nested object", () => {
    const list = {
      abc: "abc error",
      orange: "",
      somethingNull: null,
      somethingFalse: false,
      "productType.description": "size must be between 1 and 50",
      "productType.description2": "description2 size must be between 1 and 50",
      test: "test error",
    };

    const expectedTree = {
      abc: "abc error",
      productType: {
        description: "size must be between 1 and 50",
        description2: "description2 size must be between 1 and 50",
      },
      test: "test error",
    };

    expect(transformListToTree(list)).toEqual(expectedTree);
  });

  it("transform twice", () => {
    const list = {
      abc: "abc error",
      orange: "",
      somethingNull: null,
      somethingFalse: false,
      "productType.description": "size must be between 1 and 50",
      "productType.description2": "description2 size must be between 1 and 50",
      test: "test error",
    };

    const expectedTree = {
      abc: "abc error",
      productType: {
        description: "size must be between 1 and 50",
        description2: "description2 size must be between 1 and 50",
      },
      test: "test error",
    };

    let result = transformListToTree(list);

    result = transformListToTree(result);

    expect(result).toEqual(expectedTree);
  });

  it("should return an empty object when given an empty list", () => {
    const list = {};
    const expectedTree = {};

    expect(transformListToTree(list)).toEqual(expectedTree);
  });

  it("should handle non-nested lists", () => {
    const list = {
      abc: "abc error",
      test: "test error",
    };

    const expectedTree = {
      abc: "abc error",
      test: "test error",
    };

    expect(transformListToTree(list)).toEqual(expectedTree);
  });
});
