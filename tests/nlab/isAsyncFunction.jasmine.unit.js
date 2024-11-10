"use strict";

//  ✓isAsyncFunction - []                                                  -> false
//  ✓isAsyncFunction - {}                                                  -> false
//  ✓isAsyncFunction - using with object that have implemented toString()  -> false
//  ✓isAsyncFunction - extended object                                     -> false
//  ✓isAsyncFunction - new function () {}                                  -> false
//  ✓isAsyncFunction - function () {}                                      -> false
//  ✓isAsyncFunction - () => {}                                            -> false
//  ✓isAsyncFunction - null                                                -> false
//  ✓isAsyncFunction - true                                                -> false
//  ✓isAsyncFunction - false                                               -> false
//  ✓isAsyncFunction - NaN                                                 -> false
//  ✓isAsyncFunction - undefined                                           -> false
//  ✓isAsyncFunction - no arg                                              -> false
//  ✓isAsyncFunction - 4                                                   -> false
//  ✓isAsyncFunction - string                                              -> false
//  ✓isAsyncFunction - Symbol('test')                                      -> false
//  ✓isAsyncFunction - new Date()                                          -> false

const isAsyncFunction = require("nlab/isAsyncFunction.js");

try {
  jest.setTimeout(100);
} catch (e) {}

it("isAsyncFunction - null -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(null)).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - [] -> false", (done) => {
  (async function () {
    expect(isAsyncFunction([])).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - {} -> false", (done) => {
  (async function () {
    expect(isAsyncFunction({})).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - new function () {} -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(new (function () {})())).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - function () {} -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(function () {})).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - async function () {} -> true", (done) => {
  (async function () {
    expect(isAsyncFunction(async function () {})).toBeTruthy();

    done();
  })();
});

it("isAsyncFunction - () => {} -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(() => {})).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - true -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(true)).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - false -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(false)).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - NaN -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(NaN)).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - undefined -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(undefined)).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - no arg -> false", (done) => {
  (async function () {
    expect(isAsyncFunction()).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - 4 -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(4)).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - string -> false", (done) => {
  (async function () {
    expect(isAsyncFunction("test")).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - new Date() -> false", (done) => {
  (async function () {
    expect(isAsyncFunction(new Date())).toBeFalsy();

    done();
  })();
});

it(`isAsyncFunction - Symbol('test') -> false`, (done) => {
  (async function () {
    expect(isAsyncFunction(Symbol("test"))).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - using with object that have implemented toString() -> false", (done) => {
  (async function () {
    var k = function () {};
    k.prototype.toString = function () {
      return "test...";
    };

    var t = new k();

    expect(t + "").toEqual("test...");

    expect(isAsyncFunction(t)).toBeFalsy();

    done();
  })();
});

it("isAsyncFunction - extended object -> false", (done) => {
  (async function () {
    var a = function () {};

    var b = function () {};

    b.prototype = Object.create(a.prototype);

    b.prototype.constructor = b;

    expect(isAsyncFunction(new b())).toBeFalsy();

    done();
  })();
});
