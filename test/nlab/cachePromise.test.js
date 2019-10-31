// //'use strict';

const cachePromise = require('../../cachePromise');

const log = require('inspc');

const delay = require('../../delay');

it('cachePromise() - simple', async done => {
    
    try {

        const mainPromise = cachePromise(
            {a: 'b1'}, 
            () => new Promise(res => setTimeout(res, 10, 'abc'))
        );

        const data = await mainPromise;

        expect(data).toEqual('abc');

        done();

    }
    catch (e) {

        log.dump({
            e,
        })

        done({
            error: e
        })
    }
});

it('cachePromise() - double cached', async done => {
    
    try {

        let mainPromise = cachePromise(
            {a: 'b2'}, 
            () => new Promise(res => setTimeout(res, 10, 'abc'))
        );

        let data = await mainPromise;

        expect(data).toEqual('abc');

        mainPromise = cachePromise(
            {a: 'b2'}, 
            () => new Promise(res => setTimeout(res, 10, 'abcd'))
        );

        data = await mainPromise;

        expect(data).toEqual('abc');

        done();

    }
    catch (e) {

        log.dump({
            e,
        })

        done({
            error: e
        })
    }
});



it('cachePromise() - double refreshed', async done => {
    
    try {

        let mainPromise = cachePromise(
            {a: 'b3'}, 
            () => new Promise(res => setTimeout(res, 5, 'abc')),
            {
                cachetime: 5, 
            }
        );

        let data = await mainPromise;

        expect(data).toEqual('abc');

        await delay(15)

        mainPromise = cachePromise(
            {a: 'b3'}, 
            () => new Promise(res => setTimeout(res, 5, 'abcd')),
            {
                //debug: true,
                cachetime: 5, 
            }
        );

        data = await mainPromise;

        expect(data).toEqual('abcd');

        done();

    }
    catch (e) {

        log.dump({
            e,
        })

        done({
            error: e
        })
    }
});


it('cachePromise() - rejected', async done => {


    try {

        await cachePromise(
            'rej', 
            () => Promise.reject('abcr'),
        );

        done(`Shouldn't resolve1`);
    }
    catch (e) {

        expect(e).toEqual('abcr');
        
        done()
    }
});



it('cachePromise() - rejected expired flag off', async done => {

    const key = 'flagoff';
    
    try {

        await cachePromise(
            key, 
            () => Promise.reject('abcd'),
            {
                cachetime: 10, 
                //debug: true,
            }
        );

        await delay(100);

        done(`Shouldn't resolve2`);
    }
    catch (e) {

        expect(e).toEqual('abcd');

        done()
    }
});



it('cachePromise() - rejected expired flag off', async done => {

    const key = 'flagoff2';
    
    try {

        await cachePromise(
            key, 
            () => Promise.resolve('abc'),
            {
                cachetime: 10, 
                //debug: true,
            }
        );

        await delay(100);

        await cachePromise(
            key, 
            () => Promise.reject('abcd'),
            {
                cachetime: 10, 
                //debug: true,
            }
        );

        done(`Shouldn't resolve2`);
    }
    catch (e) {

        expect(e).toEqual('abcd');

        done()
    }
});

it('cachePromise() - rejected expired flag off', async done => {

    const key = 'flagoff3';
    
    try {

        await cachePromise(
            key, 
            () => Promise.resolve('abc'),
            {
                cachetime: 10, 
                //debug: true,
            }
        );

        await delay(100);

        const data = await cachePromise(
            key, 
            () => Promise.reject('abcd'),
            {
                cachetime: 10, 
                returnExpiredCacheIfRejected: true,
                //debug: true,
            }
        );

        expect(data).toEqual('abc');

        done()
    }
    catch (e) {

        done(`Shouldn't reject`);
    }
});


