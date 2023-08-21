"use strict";

const xor = require("../../xor");

it("xor() no key", (done) => {
  const data = "";

  try {
    xor(data);
  } catch (e) {
    expect(e + "").toBe("Error: xor.js: key is not a string");

    done();
  }
});

it("xor() empy string key", (done) => {
  const data = "";

  try {
    xor(data, "");
  } catch (e) {
    expect(e + "").toBe("Error: xor.js: key is an empty string");

    done();
  }
});

it("xor() empy string key", (done) => {
  const data = "";

  try {
    xor(89, "key");
  } catch (e) {
    expect(e + "").toBe("Error: xor.js: data is not a string");

    done();
  }
});

it("xor() data", (done) => {
  const data = "fdsafdsafdsafas";

  const key = "test";

  const encoded = xor(data, key);

  expect(encoded).not.toEqual(data);

  expect(xor(encoded, key)).toEqual(data);

  done();
});

it("xor() empty data", (done) => {
  const data = "";

  const key = "test";

  const encoded = xor(data, key);

  expect(encoded).toEqual(data);

  expect(xor(encoded, key)).toEqual(data);

  done();
});

it("xor() longer data", (done) => {
  const data = "one two \n three four \n six seven \n eight \n nine ten";

  const key = "test";

  const encoded = xor(data, key);

  expect(encoded).not.toEqual(data);

  expect(xor(encoded, key)).toEqual(data);

  done();
});

it("xor() longer key", (done) => {
  const data = "test";

  const key = "one two \n three four \n six seven \n eight \n nine ten";

  const encoded = xor(data, key);

  expect(encoded).not.toEqual(data);

  expect(xor(encoded, key)).toEqual(data);

  done();
});
