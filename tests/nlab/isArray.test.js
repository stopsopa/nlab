"use strict";

delete Array.isArray;

//  ✓isArray - []                                                  -> true
//  ✓isArray - {}                                                  -> false
//  ✓isArray - Object.create(null)                                 -> false
//  ✓isArray - using with object that have implemented toString()  -> false
//  ✓isArray - extended object                                     -> false
//  ✓isArray - new function () {}                                  -> false
//  ✓isArray - function () {}                                      -> false
//  ✓isArray - () => {}                                            -> false
//  ✓isArray - null                                                -> false
//  ✓isArray - true                                                -> false
//  ✓isArray - false                                               -> false
//  ✓isArray - NaN                                                 -> false
//  ✓isArray - undefined                                           -> false
//  ✓isArray - no arg                                              -> false
//  ✓isArray - 4                                                   -> false
//  ✓isArray - string                                              -> false
//  ✓isArray - Symbol('test')                                      -> false
//  ✓isArray - new Date()                                          -> false
//  ✓isArray - new Date()                                          -> false
//  ✓isArray - new Map()                                           -> false
//  ✓isArray - new Set()                                           -> false
//  ✓isArray - new Error()                                         -> false

const isArray = require("../../isArray");

jest.setTimeout(100);

it("isArray - null -> false", (done) => {
  (async function () {
    expect(isArray(null)).toBeFalsy();
    expect(Array.isArray(null)).toBeFalsy();

    done();
  })();
});

it("isArray - [] -> true", (done) => {
  (async function () {
    expect(isArray([])).toBeTruthy();
    expect(Array.isArray([])).toBeTruthy();

    done();
  })();
});

it("isArray - {} -> false", (done) => {
  (async function () {
    expect(isArray({})).toBeFalsy();
    expect(Array.isArray({})).toBeFalsy();

    done();
  })();
});
it("Plain object -> false", (done) => {
  (async function () {
    expect(isArray(Object.create(null))).toBeFalsy();
    expect(Array.isArray(Object.create(null))).toBeFalsy();

    done();
  })();
});

it("isArray - new function () {} -> false", (done) => {
  (async function () {
    expect(isArray(new (function () {})())).toBeFalsy();
    expect(Array.isArray(new (function () {})())).toBeFalsy();

    done();
  })();
});

it("isArray - function () {} -> false", (done) => {
  (async function () {
    expect(isArray(function () {})).toBeFalsy();
    expect(Array.isArray(function () {})).toBeFalsy();

    done();
  })();
});

it("isArray - async function () {} -> false", (done) => {
  (async function () {
    expect(isArray(async function () {})).toBeFalsy();
    expect(Array.isArray(async function () {})).toBeFalsy();

    done();
  })();
});

it("isArray - () => {} -> false", (done) => {
  (async function () {
    expect(isArray(() => {})).toBeFalsy();
    expect(Array.isArray(() => {})).toBeFalsy();

    done();
  })();
});

it("isArray - true -> false", (done) => {
  (async function () {
    expect(isArray(true)).toBeFalsy();
    expect(Array.isArray(true)).toBeFalsy();

    done();
  })();
});

it("isArray - false -> false", (done) => {
  (async function () {
    expect(isArray(false)).toBeFalsy();
    expect(Array.isArray(false)).toBeFalsy();

    done();
  })();
});

it("isArray - NaN -> false", (done) => {
  (async function () {
    expect(isArray(NaN)).toBeFalsy();
    expect(Array.isArray(NaN)).toBeFalsy();

    done();
  })();
});

it("isArray - undefined -> false", (done) => {
  (async function () {
    expect(isArray(undefined)).toBeFalsy();
    expect(Array.isArray(undefined)).toBeFalsy();

    done();
  })();
});

it("isArray - no arg -> false", (done) => {
  (async function () {
    expect(isArray()).toBeFalsy();
    expect(Array.isArray()).toBeFalsy();

    done();
  })();
});

it("isArray - 4 -> false", (done) => {
  (async function () {
    expect(isArray(4)).toBeFalsy();
    expect(Array.isArray(4)).toBeFalsy();

    done();
  })();
});

it("isArray - string -> false", (done) => {
  (async function () {
    expect(isArray("test")).toBeFalsy();
    expect(Array.isArray("test")).toBeFalsy();

    done();
  })();
});

it("isArray - new Date() -> false", (done) => {
  (async function () {
    expect(isArray(new Date())).toBeFalsy();
    expect(Array.isArray(new Date())).toBeFalsy();

    done();
  })();
});

it(`isArray - Symbol('test') -> false`, (done) => {
  (async function () {
    expect(isArray(Symbol("test"))).toBeFalsy();
    expect(Array.isArray(Symbol("test"))).toBeFalsy();

    done();
  })();
});

it("isArray - new Map() -> false", (done) => {
  (async function () {
    expect(isArray(new Map())).toBeFalsy();
    expect(Array.isArray(new Map())).toBeFalsy();

    done();
  })();
});

it("isArray - new Set() -> false", (done) => {
  (async function () {
    expect(isArray(new Set())).toBeFalsy();
    expect(Array.isArray(new Set())).toBeFalsy();

    done();
  })();
});

it("isArray - using with object that have implemented toString() -> false", (done) => {
  (async function () {
    var k = function () {};
    k.prototype.toString = function () {
      return "test...";
    };

    var t = new k();

    expect(t + "").toEqual("test...");

    expect(isArray(t)).toBeFalsy();
    expect(Array.isArray(t)).toBeFalsy();

    done();
  })();
});

it("isArray - extended object -> false", (done) => {
  (async function () {
    var a = function () {};

    var b = function () {};

    b.prototype = Object.create(a.prototype);

    b.prototype.constructor = b;

    expect(isArray(new b())).toBeFalsy();
    expect(Array.isArray(new b())).toBeFalsy();

    done();
  })();
});
