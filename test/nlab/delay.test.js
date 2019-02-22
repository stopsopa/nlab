'use strict';

const delay = require('../../delay');

const then = delay.then;

const { start, diff } = require('./timer');

jest.setTimeout(100);

/**
 * Resolve:
 */

it('delay - get delayed promise with payload', async done => {

    start();

    const d = 50;

    delay(d, 'ok')
        .then(data => {

            expect(data).toEqual('ok');

            expect(diff()).toBeGreaterThanOrEqual(d);

            done();
        })
    ;
});

it('delay - pass payload manually', async done => {

    start();

    const d = 50;

    Promise.resolve('msg')
        .then(
            dd => delay(d, dd),
            dd => delay.reject(d, dd)
        )
        .then(dd => {

            expect(dd).toEqual('msg');

            expect(diff()).toBeGreaterThanOrEqual(d);

            done();
        })
    ;
});

it('delay - pass payload transparently', async done => {

    start();

    const d = 50;

    Promise.resolve('msg')
        .then(
            delay(d),
            dd => delay.reject(d, dd)
        )
        .then(dd => {

            expect(dd).toEqual('msg');

            expect(diff()).toBeGreaterThanOrEqual(d);

            done();
        })
    ;
});

/**
 * Reject:
 */

it('reject - get delayed promise with payload', async done => {

    start();

    const d = 50;

    delay.reject(d, 'ok')
        .catch(data => {

            expect(data).toEqual('ok');

            expect(diff()).toBeGreaterThanOrEqual(d);

            done();
        })
    ;
});

it('reject - pass payload manually', async done => {

    start();

    const d = 50;

    Promise.reject('msg')
        .then(
            dd => delay(d, dd),
            dd => delay.reject(d, dd)
        )
        .catch(dd => {

            expect(dd).toEqual('msg');

            expect(diff()).toBeGreaterThanOrEqual(d);

            done();
        })
    ;
});

it('reject - pass payload transparently', async done => {

    start();

    const d = 50;

    Promise.reject('msg')
        .then(
            delay(d),
            delay.reject(d)
        )
        .catch(dd => {

            expect(dd).toEqual('msg');

            expect(diff()).toBeGreaterThanOrEqual(d);

            done();
        })
    ;
});

it('then - resolve', async done => {

    start();

    const d = 50;

    Promise.resolve('msg')
        .then(...then(d))
        .then(dd => {

            expect(dd).toEqual('msg');

            expect(diff()).toBeGreaterThanOrEqual(d);

            done();
        })
    ;
});

it('then - reject', async done => {

    start();

    const d = 50;

    Promise.reject('msg')
        .then(...then(d))
        .catch(dd => {

            expect(dd).toEqual('msg');

            expect(diff()).toBeGreaterThanOrEqual(d);

            done();
        })
    ;
});

