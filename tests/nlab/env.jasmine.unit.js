"use strict";

const { mockEnv, get, getDefault, getIntegerThrowInvalid, getIntegerDefault, getThrow } = require("nlab/env.js");

try {
  jest.setTimeout(100);
} catch (e) {}

it("get - ABC -> DEF", async () => {
  mockEnv({
    ABC: "DEF",
  });

  expect(get("ABC")).toEqual("DEF");
  expect(get("GHI")).toEqual(undefined);
});

it("getDefault - ABC -> DEF", async () => {
  mockEnv({
    ABC: "DEF",
  });

  expect(getDefault("ABC", "GHI")).toEqual("DEF");
  expect(getDefault("GHI", "JKL")).toEqual("JKL");
});

it("getThrow - ABC -> DEF", async () => {
  mockEnv({
    ABC: "DEF",
  });

  expect(getThrow("ABC")).toEqual("DEF");
  expect(() => getThrow("GHI")).toThrowError("env var GHI is not defined");
});

it("getIntegerThrowInvalid - ABC -> 123", async () => {
  mockEnv({
    ABC: "123",
    ZZZ: "not a number",
    BIG: "90071992547409919007199254740991",
  });

  expect(getIntegerThrowInvalid("ABC")).toEqual(123);
  expect(getIntegerThrowInvalid("GHI")).toEqual(undefined);
  expect(() => getIntegerThrowInvalid("ZZZ")).toThrowError(
    "env var ZZZ is not a number. value >not a number<, doesn't match regex >/^-?\\d+$/<",
  );
  expect(() => getIntegerThrowInvalid("BIG")).toThrowError(
    "parseInt(90071992547409919007199254740991, 10) returned 9.007199254740992e+31, doesn't match regex >/^-?\\d+$/<",
  );
});

it("getIntegerDefault - ABC -> 123", async () => {
  mockEnv({
    ABC: "123",
    ZZZ: "not a number",
  });

  expect(getIntegerDefault("ABC", 456)).toEqual(123);
  expect(getIntegerDefault("GHI", 789)).toEqual(789);
  expect(getIntegerDefault("ZZZ", 789)).toEqual(789);
});
