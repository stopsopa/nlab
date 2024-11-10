const transformTreeToList = require("nlab/transformTreeToList.js");

describe("Test transformTreeToList", () => {
  it("should transform a nested object into a flat list", () => {
    const tree = {
      abc: "abc error",
      productType: {
        description: "size must be between 1 and 50",
        description2: "description2 size must be between 1 and 50",
      },
      test: "test error",
    };

    const expectedList = {
      abc: "abc error",
      "productType.description": "size must be between 1 and 50",
      "productType.description2": "description2 size must be between 1 and 50",
      test: "test error",
    };

    expect(transformTreeToList(tree)).toEqual(expectedList);
  });

  it("stransform twice", () => {
    const tree = {
      abc: "abc error",
      productType: {
        description: "size must be between 1 and 50",
        description2: "description2 size must be between 1 and 50",
      },
      test: "test error",
    };

    const expectedList = {
      abc: "abc error",
      "productType.description": "size must be between 1 and 50",
      "productType.description2": "description2 size must be between 1 and 50",
      test: "test error",
    };

    let result = transformTreeToList(tree);

    result = transformTreeToList(result);

    expect(result).toEqual(expectedList);
  });

  it("should return an empty object when given an empty object", () => {
    const tree = {};
    const expectedList = {};

    expect(transformTreeToList(tree)).toEqual(expectedList);
  });

  it("should handle non-nested objects", () => {
    const tree = {
      abc: "abc error",
      test: "test error",
    };

    const expectedList = {
      abc: "abc error",
      test: "test error",
    };

    expect(transformTreeToList(tree)).toEqual(expectedList);
  });

  it("containing array", () => {
    const tree = {
      productType: {
        gdshopFulfillmentNamespaceLookup: [
          {
            dependentQueueProc: "Must not be null.",
            gdshopFulfillmentDependentQueueTypeID: "Must not be null.",
            dependentQueueTemplate: "Must not be null.",
          },
          {
            dependentQueueTemplate: "Must not be null.",
            dependentQueueProc: "Must not be null.",
            gdshopFulfillmentDependentQueueTypeID: "Must not be null.",
          },
        ],
      },
    };

    const expectedList = {
      "productType.gdshopFulfillmentNamespaceLookup.0.dependentQueueProc": "Must not be null.",
      "productType.gdshopFulfillmentNamespaceLookup.0.gdshopFulfillmentDependentQueueTypeID": "Must not be null.",
      "productType.gdshopFulfillmentNamespaceLookup.0.dependentQueueTemplate": "Must not be null.",
      "productType.gdshopFulfillmentNamespaceLookup.1.dependentQueueTemplate": "Must not be null.",
      "productType.gdshopFulfillmentNamespaceLookup.1.dependentQueueProc": "Must not be null.",
      "productType.gdshopFulfillmentNamespaceLookup.1.gdshopFulfillmentDependentQueueTypeID": "Must not be null.",
    };

    const result = transformTreeToList(tree);

    expect(result).toEqual(expectedList);
  });
});
