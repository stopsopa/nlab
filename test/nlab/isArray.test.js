'use strict';

//  ✓isArray - []                                                  -> true
//  ✓isArray - {}                                                  -> false
//  ✓isArray - using with object that have implemented toString()  -> false
//  ✓isArray - extended object                                     -> false
//  ✓isArray - new function () {}                                  -> false
//  ✓isArray - function () {}                                      -> false
//  ✓isArray - () => {}                                            -> false
//  ✓isArray - true                                                -> false
//  ✓isArray - false                                               -> false
//  ✓isArray - NaN                                                 -> false
//  ✓isArray - undefined                                           -> false
//  ✓isArray - no arg                                              -> false
//  ✓isArray - 4                                                   -> false
//  ✓isArray - string                                              -> false
//  ✓isArray - Symbol('test')                                      -> false

const isArray = require('../../isArray');

jest.setTimeout(100);

it('isArray - [] -> true', async done => {

    expect(isArray([])).toBeTruthy();
    expect(Array.isArray([])).toBeTruthy();

    done();
});

it('isArray - {} -> false', async done => {

    expect(isArray({})).toBeFalsy();
    expect(Array.isArray({})).toBeFalsy();

    done();
});

it('isArray - new function () {} -> false', async done => {

    expect(isArray(new function () {})).toBeFalsy();
    expect(Array.isArray(new function () {})).toBeFalsy();

    done();
});

it('isArray - function () {} -> false', async done => {

    expect(isArray(function () {})).toBeFalsy();
    expect(Array.isArray(function () {})).toBeFalsy();

    done();
});

it('isArray - () => {} -> false', async done => {

    expect(isArray(() => {})).toBeFalsy();
    expect(Array.isArray(() => {})).toBeFalsy();

    done();
});

it('isArray - true -> false', async done => {

    expect(isArray(true)).toBeFalsy();
    expect(Array.isArray(true)).toBeFalsy();

    done();
});

it('isArray - false -> false', async done => {

    expect(isArray(false)).toBeFalsy();
    expect(Array.isArray(false)).toBeFalsy();

    done();
});

it('isArray - NaN -> false', async done => {

    expect(isArray(NaN)).toBeFalsy();
    expect(Array.isArray(NaN)).toBeFalsy();

    done();
});

it('isArray - undefined -> false', async done => {

    expect(isArray(undefined)).toBeFalsy();
    expect(Array.isArray(undefined)).toBeFalsy();

    done();
});

it('isArray - no arg -> false', async done => {

    expect(isArray()).toBeFalsy();
    expect(Array.isArray()).toBeFalsy();

    done();
});

it('isArray - 4 -> false', async done => {

    expect(isArray(4)).toBeFalsy();
    expect(Array.isArray(4)).toBeFalsy();

    done();
});

it('isArray - string -> false', async done => {

    expect(isArray('test')).toBeFalsy();
    expect(Array.isArray('test')).toBeFalsy();

    done();
});

it(`isArray - Symbol('test') -> false`, async done => {

    expect(isArray(Symbol('test'))).toBeFalsy();
    expect(Array.isArray(Symbol('test'))).toBeFalsy();

    done();
});

it('isArray - using with object that have implemented toString() -> false', async done => {

    var k = function () {}
    k.prototype.toString = function () {return 'test...'};

    var t = new k();

    expect(t + '').toEqual('test...');

    expect(isArray(t)).toBeFalsy();
    expect(Array.isArray(t)).toBeFalsy();

    done();
});

it('isArray - extended object -> false', async done => {

    var a = function () {};

    var b = function () {};

    b.prototype = Object.create(a.prototype);

    b.prototype.constructor = b;

    expect(isArray(new b())).toBeFalsy();
    expect(Array.isArray(new b())).toBeFalsy();

    done();
});