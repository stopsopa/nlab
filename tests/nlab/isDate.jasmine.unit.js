"use strict";

//  ✓isDate - new Date()                                          -> true
//  ✓isDate - {}                                                  -> false
//  ✓isDate - using with object that have implemented toString()  -> false
//  ✓isDate - extended object                                     -> false
//  ✓isDate - new function () {}                                  -> false
//  ✓isDate - []                                                  -> false
//  ✓isDate - function () {}                                      -> false
//  ✓isDate - () => {}                                            -> false
//  ✓isDate - null                                                -> false
//  ✓isDate - true                                                -> false
//  ✓isDate - false                                               -> false
//  ✓isDate - NaN                                                 -> false
//  ✓isDate - undefined                                           -> false
//  ✓isDate - no arg                                              -> false
//  ✓isDate - 4                                                   -> false
//  ✓isDate - string                                              -> false
//  ✓isDate - Symbol('test')                                      -> false

const isDate = require("../../isDate");

try {
  jest.setTimeout(100);
} catch (e) {}

it("isDate - new Date() -> true", (done) => {
  (async function () {
    expect(isDate(new Date())).toBeTruthy();

    done();
  })();
});

it("isDate - {} -> false", (done) => {
  (async function () {
    expect(isDate({})).toBeFalsy();

    done();
  })();
});

it("isDate - null -> false", (done) => {
  (async function () {
    expect(isDate(null)).toBeFalsy();

    done();
  })();
});

it("isDate - [] -> false", (done) => {
  (async function () {
    expect(isDate([])).toBeFalsy();

    done();
  })();
});

it("isDate - new function () {} -> false", (done) => {
  (async function () {
    expect(isDate(new (function () {})())).toBeFalsy();

    done();
  })();
});

it("isDate - function () {} -> false", (done) => {
  (async function () {
    expect(isDate(function () {})).toBeFalsy();

    done();
  })();
});

it("isDate - () => {} -> false", (done) => {
  (async function () {
    expect(isDate(() => {})).toBeFalsy();

    done();
  })();
});

it("isDate - true -> false", (done) => {
  (async function () {
    expect(isDate(true)).toBeFalsy();

    done();
  })();
});

it("isDate - false -> false", (done) => {
  (async function () {
    expect(isDate(false)).toBeFalsy();

    done();
  })();
});

it("isDate - NaN -> false", (done) => {
  (async function () {
    expect(isDate(NaN)).toBeFalsy();

    done();
  })();
});

it("isDate - undefined -> false", (done) => {
  (async function () {
    expect(isDate(undefined)).toBeFalsy();

    done();
  })();
});

it("isDate - no arg -> false", (done) => {
  (async function () {
    expect(isDate()).toBeFalsy();

    done();
  })();
});

it("isDate - 4 -> false", (done) => {
  (async function () {
    expect(isDate(4)).toBeFalsy();

    done();
  })();
});

it("isDate - string -> false", (done) => {
  (async function () {
    expect(isDate("test")).toBeFalsy();

    done();
  })();
});

it(`isDate - Symbol('test') -> false`, (done) => {
  (async function () {
    expect(isDate(Symbol("test"))).toBeFalsy();

    done();
  })();
});

it("isDate - using with object that have implemented toString() -> false", (done) => {
  (async function () {
    var k = function () {};
    k.prototype.toString = function () {
      return "test...";
    };

    var t = new k();

    expect(t + "").toEqual("test...");

    expect(isDate(t)).toBeFalsy();

    done();
  })();
});

it("isDate - extended object -> false", (done) => {
  (async function () {
    var a = function () {};

    var b = function () {};

    b.prototype = Object.create(a.prototype);

    b.prototype.constructor = b;

    expect(isDate(new b())).toBeFalsy();

    done();
  })();
});
