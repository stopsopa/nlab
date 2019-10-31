const th = msg => new Error(`cachePromise error: ${msg}`);

// const log = require('inspc');

const now = () => (new Date()).getTime();

const cache = {};

const tool = async (key, getPromise, opt) => {

    const {
        cachetime = 1 * 1000,
        // debug = false,
        returnExpiredCacheIfRejected = false,
    } = opt || {};

    let buff;

    key = JSON.stringify(key);

    try {

        if ( cachetime < 1 ) {

            throw th(`cachetime can't be smaller than 1`);
        }

        if ( typeof key !== 'string' ) {

            throw th(`key after being serialized is not a string`);
        }

        if ( typeof getPromise !== 'function' ) {

            throw th(`getPromise is not a function`);
        }

        buff = cache[key];

        const n = now();

//         debug && log.dump({
//             cachetime,
//             key,
//             cache,
//             buff,
//             returnExpiredCacheIfRejected,
//             'n - buff.n': (function () {
//                 try {
// return n - buff.n
//                 }
//                 catch (e) {
//
//                 }
//             }()),
//             cond2: (function () {
//                 try {
// return n - buff.n > cachetime;
//                 }
//                 catch (e) {
//
//                 }
//             }()),
//             cond: (function () {
//                 try {
//
//                     return typeof buff === 'undefined' || ( n - buff.n) > cachetime;
//                 }
//                 catch (e) {
//
//                 }
//             }())
//         }, 4)



        if ( typeof buff === 'undefined' || ( n - buff.n) >= cachetime ) {

            const p = getPromise();

            await p;

            cache[key] = {
                n,
                p
            };
        }

        return cache[key].p;
    }
    catch (e) {

        if ( typeof buff !== 'undefined' && returnExpiredCacheIfRejected ) {
    
            return buff.p;
        }

        throw e;
    }
}

module.exports = tool;