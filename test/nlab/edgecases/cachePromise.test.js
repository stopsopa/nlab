
const cachePromise = require('../../../cachePromise');

const log = require('inspc');

const delay = require('../../../delay');

it('cachePromise() edge case: cachetime < 1', async done => {

    try {

        await cachePromise({}, () => {}, {
            cachetime: -1
        })
    }
    catch (e) {

        expect(String(e)).toEqual("Error: cachePromise error: cachetime can't be smaller than 1");

        done();
    }
});


it('cachePromise() edge case: key != string', async done => {

    try {

        await cachePromise(undefined, () => {})
    }
    catch (e) {

        expect(String(e)).toEqual("Error: cachePromise error: key after being serialized is not a string");

        done();
    }
});



it('cachePromise() edge case: not a function', async done => {

    try {

        await cachePromise({})
    }
    catch (e) {

        expect(String(e)).toEqual("Error: cachePromise error: getPromise is not a function");

        done();
    }
});
