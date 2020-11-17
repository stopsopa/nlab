'use strict';

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

const isAsyncFunction = require('../../isAsyncFunction');

jest.setTimeout(100);

it('isAsyncFunction - null -> false', async done => {

    expect(isAsyncFunction(null)).toBeFalsy();

    done();
});

it('isAsyncFunction - [] -> false', async done => {

    expect(isAsyncFunction([])).toBeFalsy();

    done();
});

it('isAsyncFunction - {} -> false', async done => {

    expect(isAsyncFunction({})).toBeFalsy();

    done();
});

it('isAsyncFunction - new function () {} -> false', async done => {

    expect(isAsyncFunction(new function () {})).toBeFalsy();

    done();
});

it('isAsyncFunction - function () {} -> false', async done => {

    expect(isAsyncFunction(function () {})).toBeFalsy();

    done();
});

it('isAsyncFunction - async function () {} -> true', async done => {

    expect(isAsyncFunction(async function () {})).toBeTruthy();

    done();
});

it('isAsyncFunction - () => {} -> false', async done => {

    expect(isAsyncFunction(() => {})).toBeFalsy();

    done();
});

it('isAsyncFunction - true -> false', async done => {

    expect(isAsyncFunction(true)).toBeFalsy();

    done();
});

it('isAsyncFunction - false -> false', async done => {

    expect(isAsyncFunction(false)).toBeFalsy();

    done();
});

it('isAsyncFunction - NaN -> false', async done => {

    expect(isAsyncFunction(NaN)).toBeFalsy();

    done();
});

it('isAsyncFunction - undefined -> false', async done => {

    expect(isAsyncFunction(undefined)).toBeFalsy();

    done();
});

it('isAsyncFunction - no arg -> false', async done => {

    expect(isAsyncFunction()).toBeFalsy();

    done();
});

it('isAsyncFunction - 4 -> false', async done => {

    expect(isAsyncFunction(4)).toBeFalsy();

    done();
});

it('isAsyncFunction - string -> false', async done => {

    expect(isAsyncFunction('test')).toBeFalsy();

    done();
});

it('isAsyncFunction - new Date() -> false', async done => {

    expect(isAsyncFunction(new Date())).toBeFalsy();

    done();
});

it(`isAsyncFunction - Symbol('test') -> false`, async done => {

    expect(isAsyncFunction(Symbol('test'))).toBeFalsy();

    done();
});

it('isAsyncFunction - using with object that have implemented toString() -> false', async done => {

    var k = function () {}
    k.prototype.toString = function () {return 'test...'};

    var t = new k();

    expect(t + '').toEqual('test...');

    expect(isAsyncFunction(t)).toBeFalsy();

    done();
});

it('isAsyncFunction - extended object -> false', async done => {

    var a = function () {};

    var b = function () {};

    b.prototype = Object.create(a.prototype);

    b.prototype.constructor = b;

    expect(isAsyncFunction(new b())).toBeFalsy();

    done();
});