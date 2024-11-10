const transformListToTree = require("nlab/transformListToTree.js");

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

  it("object not array", () => {
    // WARNING:
    // WARNING: if that should be ever used with lodash then usage of _.setWith is needed instead of _.set
    // WARNING: and replacing set(obj, key, value); with set(obj, String(key), value, Object);
    // WARNING: otherwise last test "object not array" will fail returning array instead of object
    // WARNING:
    const list = {
      "productTypePurchase.plProductGroup.3.description":
        "Value is too short. Please enter a value of at least 1 character long.",
      "productTypePurchase.plProductGroup.4.description":
        "Value is too short. Please enter a value of at least 1 character long.",
      "productTypePurchase.plProductGroup.0.description":
        "Value is too short. Please enter a value of at least 1 character long.",
    };

    const expectedTree = {
      productTypePurchase: {
        plProductGroup: {
          0: {
            description: "Value is too short. Please enter a value of at least 1 character long.",
          },
          3: {
            description: "Value is too short. Please enter a value of at least 1 character long.",
          },
          4: {
            description: "Value is too short. Please enter a value of at least 1 character long.",
          },
        },
      },
    };

    const result = transformListToTree(list);

    expect(result).toEqual(expectedTree);
  });
});
