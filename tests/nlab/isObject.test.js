"use strict";

//  ✓isObject - {}                                                  -> true
//  ✓isObject - Object.create(null)                                 -> true
//  ✓isObject - using with object that have implemented toString()  -> true
//  ✓isObject - extended object                                     -> true
//  ✓isObject - new function () {}                                  -> true
//  ✓isObject - []                                                  -> false
//  ✓isObject - function () {}                                      -> false
//  ✓isObject - () => {}                                            -> false
//  ✓isObject - true                                                -> false
//  ✓isObject - false                                               -> false
//  ✓isObject - NaN                                                 -> false
//  ✓isObject - undefined                                           -> false
//  ✓isObject - no arg                                              -> false
//  ✓isObject - 4                                                   -> false
//  ✓isObject - string                                              -> false
//  ✓isObject - Symbol('test')                                      -> false
//  ✓isObject - new Date()                                          -> false
//  ✓isObject - new Map()                                           -> false
//  ✓isObject - new Set()                                           -> false
//  ✓isObject - new Error()                                         -> false

const isObject = require("../../isObject");

jest.setTimeout(100);

it("isObject - {} -> true", (done) => {
  (async function () {
    expect(isObject({})).toBeTruthy();

    done();
  })();
});
it("Plain object -> true", (done) => {
  (async function () {
    expect(isObject(Object.create(null))).toBeTruthy();

    done();
  })();
});

it("isObject - new function () {} -> true", (done) => {
  (async function () {
    expect(isObject(new (function () {})())).toBeTruthy();

    done();
  })();
});

it("isObject - using with object that have implemented toString() -> true", (done) => {
  (async function () {
    var k = function () {};
    k.prototype.toString = function () {
      return "test...";
    };

    var t = new k();

    expect(t + "").toEqual("test...");

    expect(isObject(t)).toBeTruthy();

    done();
  })();
});

it("isObject - extended object -> true", (done) => {
  (async function () {
    var a = function () {};

    var b = function () {};

    b.prototype = Object.create(a.prototype);

    b.prototype.constructor = b;

    expect(isObject(new b())).toBeTruthy();

    done();
  })();
});

it("isObject - [] -> false", (done) => {
  (async function () {
    expect(isObject([])).toBeFalsy();

    done();
  })();
});

it("isObject - null -> false", (done) => {
  (async function () {
    expect(isObject(null)).toBeFalsy();

    done();
  })();
});

it("isObject - function () {} -> false", (done) => {
  (async function () {
    expect(isObject(function () {})).toBeFalsy();

    done();
  })();
});

it("isObject - async function () {} -> false", (done) => {
  (async function () {
    expect(isObject(async function () {})).toBeFalsy();

    done();
  })();
});

it("isObject - () => {} -> false", (done) => {
  (async function () {
    expect(isObject(() => {})).toBeFalsy();

    done();
  })();
});

it("isObject - true -> false", (done) => {
  (async function () {
    expect(isObject(true)).toBeFalsy();

    done();
  })();
});

it("isObject - false -> false", (done) => {
  (async function () {
    expect(isObject(false)).toBeFalsy();

    done();
  })();
});

it("isObject - NaN -> false", (done) => {
  (async function () {
    expect(isObject(NaN)).toBeFalsy();

    done();
  })();
});

it("isObject - undefined -> false", (done) => {
  (async function () {
    expect(isObject(undefined)).toBeFalsy();

    done();
  })();
});

it("isObject - no arg -> false", (done) => {
  (async function () {
    expect(isObject()).toBeFalsy();

    done();
  })();
});

it("isObject - 4 -> false", (done) => {
  (async function () {
    expect(isObject(4)).toBeFalsy();

    done();
  })();
});

it("isObject - string -> false", (done) => {
  (async function () {
    expect(isObject("test")).toBeFalsy();

    done();
  })();
});

it(`isObject - Symbol('test') -> false`, (done) => {
  (async function () {
    expect(isObject(Symbol("test"))).toBeFalsy();

    done();
  })();
});

it("isObject - new Date() -> false", (done) => {
  (async function () {
    expect(isObject(new Date())).toBeFalsy();

    done();
  })();
});

it("isObject - new Map() -> false", (done) => {
  (async function () {
    expect(isObject(new Map())).toBeFalsy();

    done();
  })();
});

it("isObject - new Set() -> false", (done) => {
  (async function () {
    expect(isObject(new Set())).toBeFalsy();

    done();
  })();
});


it("isObject - new Error() -> false", (done) => {
  (async function () {
    expect(isObject(new Error())).toBeFalsy();

    done();
  })();
});
