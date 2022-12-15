"use strict";

const get = require("../../get");

const data = {
  test: {
    one: [
      {
        two: "three",
      },
    ],
    empty: false,
  },
};

it("get() - simple", () => {
  expect(get(data, "test.one.0.two")).toBe("three");
});

it("get() - json false", () => {
  expect(JSON.stringify(get(data))).toBe(JSON.stringify(data));
});

it("get() - json []", () => {
  expect(JSON.stringify(get([]))).toBe(JSON.stringify([]));
});

it("get() - json undefined 1", () => {
  expect(JSON.stringify(get(undefined, "one.two", "test"))).toBe(
    JSON.stringify("test")
  );
});

it("get() - json undefined 2", () => {
  expect(JSON.stringify(get(undefined, "two", "test"))).toBe(
    JSON.stringify("test")
  );
});

it("get() - json {}", () => {
  expect(JSON.stringify(get({}, "two", "test"))).toBe(JSON.stringify("test"));
});

it("get() - json [] key", () => {
  expect(JSON.stringify(get([], "key"))).toBe(JSON.stringify(undefined));
});

it("get() - json [] ''", () => {
  expect(JSON.stringify(get([], ""))).toBe(JSON.stringify([]));
});

it("get() - json [] 'key' 'default'", () => {
  expect(get([], "returndefualt", "default")).toBe("default");
});

it("get() - json 'string' 'key' 'default'", () => {
  expect(get("string", "returndefualt", "default")).toBe("default");
});

it("get() - json 'string' 'key' 'default'", () => {
  expect(get("string", "3", "default")).toBe("i");
});

it("get() - json empty", () => {
  expect(get(data, "test.empty")).toBe(false);
});
