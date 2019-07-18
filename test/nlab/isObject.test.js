'use strict';

//  ✓isObject - {}                                                  -> true
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

const isObject = require('../../isObject');

jest.setTimeout(100);

it('isObject - {} -> true', async done => {

    expect(isObject({})).toBeTruthy();

    done();
});

it('isObject - new function () {} -> true', async done => {

    expect(isObject(new function () {})).toBeTruthy();

    done();
});

it('isObject - using with object that have implemented toString() -> true', async done => {

    var k = function () {}
    k.prototype.toString = function () {return 'test...'};

    var t = new k();

    expect(t + '').toEqual('test...');

    expect(isObject(t)).toBeTruthy();

    done();
});

it('isObject - extended object -> true', async done => {

    var a = function () {};

    var b = function () {};

    b.prototype = Object.create(a.prototype);

    b.prototype.constructor = b;

    expect(isObject(new b())).toBeTruthy();

    done();
});

it('isObject - [] -> false', async done => {

    expect(isObject([])).toBeFalsy();

    done();
});

it('isObject - null -> false', async done => {

    expect(isObject(null)).toBeFalsy();

    done();
});

it('isObject - function () {} -> false', async done => {

    expect(isObject(function () {})).toBeFalsy();

    done();
});

it('isObject - () => {} -> false', async done => {

    expect(isObject(() => {})).toBeFalsy();

    done();
});

it('isObject - true -> false', async done => {

    expect(isObject(true)).toBeFalsy();

    done();
});

it('isObject - false -> false', async done => {

    expect(isObject(false)).toBeFalsy();

    done();
});

it('isObject - NaN -> false', async done => {

    expect(isObject(NaN)).toBeFalsy();

    done();
});

it('isObject - undefined -> false', async done => {

    expect(isObject(undefined)).toBeFalsy();

    done();
});

it('isObject - no arg -> false', async done => {

    expect(isObject()).toBeFalsy();

    done();
});

it('isObject - 4 -> false', async done => {

    expect(isObject(4)).toBeFalsy();

    done();
});

it('isObject - string -> false', async done => {

    expect(isObject('test')).toBeFalsy();

    done();
});

it(`isObject - Symbol('test') -> false`, async done => {

    expect(isObject(Symbol('test'))).toBeFalsy();

    done();
});

it('isObject - new Date() -> false', async done => {

    expect(isObject(new Date())).toBeFalsy();

    done();
});