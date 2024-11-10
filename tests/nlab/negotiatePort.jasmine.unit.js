"use strict";

const np = require("nlab/negotiatePort.js");

it("negotiatePort - no protocol", (done) => {
  try {
    np();
  } catch (e) {
    expect(String(e)).toEqual("Error: negotiatePort error: protocol 'undefined' is not a string");

    done();
  }
});

it("negotiatePort - wrong protocol", (done) => {
  try {
    np("httpss");
  } catch (e) {
    expect(String(e)).toEqual("Error: negotiatePort error: protocol 'httpss' don't match /^https?$/");

    done();
  }
});

it("negotiatePort - no port", (done) => {
  const port = np("http");

  expect(port).toEqual("");

  done();
});

it("negotiatePort - port - not a number", (done) => {
  try {
    np("https", "56x");
  } catch (e) {
    expect(String(e)).toEqual("Error: negotiatePort error: port '56x' is not a number");

    done();
  }
});

it("negotiatePort - https 443 string", (done) => {
  expect(np("https", "443")).toEqual("");

  done();
});

it("negotiatePort - https 443 int", (done) => {
  expect(np("https", 443)).toEqual("");

  done();
});

it("negotiatePort - https: 443 int", (done) => {
  expect(np("https:", 443)).toEqual("");

  done();
});

it("negotiatePort - https:// 443 int", (done) => {
  expect(np("https://", 443)).toEqual("");

  done();
});

it("negotiatePort - https:// 443 string", (done) => {
  expect(np("https://", "443")).toEqual("");

  done();
});

it("negotiatePort - https 445 int", (done) => {
  expect(np("https", 445)).toEqual("445");

  done();
});

it("negotiatePort - https 445 int, : prefix", (done) => {
  expect(np("https", 445, ":")).toEqual(":445");

  done();
});

it("negotiatePort - http 443 int, : prefix", (done) => {
  expect(np("http", 443, ":")).toEqual(":443");

  done();
});

it("negotiatePort - http 80 int, : prefix", (done) => {
  expect(np("http", 80, ":")).toEqual("");

  done();
});

it("negotiatePort - http 81 int, : prefix", (done) => {
  expect(np("http", 81, ":")).toEqual(":81");

  done();
});

it("negotiatePort - demo", (done) => {
  const list = [
    np("http", 80), // ''
    np("http", "80"), // ''
    np("http:", "80"), // ''
    np("http://", "80"), // ''
    np("http", "81"), // '81'
    np("http", "81", ":"), // ':81'
    np("https", "80"), // '80'
    np("https", "80", ":"), // ':80'
    np("https", 443), // ''
    np("https:", 445), // '445'
    np("https:/", 443), // ''
    np("https://", 443), // ''
    np("https://", 445), // '445'
    np("https", "443"), // ''
    np("https", "443", ":"), // ''
    np("https", "44", ":"), // ':44'
  ];

  // console.log(JSON.stringify(list, null, 4));

  expect(list).toEqual(["", "", "", "", "81", ":81", "80", ":80", "", "445", "", "", "445", "", "", ":44"]);

  done();
});

it("negotiatePort - http undefined int, : prefix", (done) => {
  expect(np("http", undefined, ":")).toEqual("");

  done();
});

it("negotiatePort - http enpty string int, : prefix", (done) => {
  expect(np("http", "", ":")).toEqual("");

  done();
});
