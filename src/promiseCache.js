
/**
 * Purpose of this library is to reduce numbers of request to certain amout per given time, not more - that's the main goal
 * all rest is just optimizing to use those request in most efficient way to serve individual http responses
 * 
 * requirements:
 * node-forge@0.8.1
 *
 * yarn add node-forge@0.8.1
 */
const isObject  = require('./isObject');

const isArray   = require('./isArray');

const isDate    = require('./isDate');

const sha256    = require('./sha256');

const log       = require('inspc');

const prepareToStamp = data => {

    let tmp = data;

    if (typeof data === 'function') {

        tmp = data.toString();
    }

    if ( isDate(data) ) {

        tmp = data.toISOString();
    }

    if ( isArray(data) ) {

        tmp = data.map(prepareToStamp);
    }

    if (isObject(data)) {

        let keys = Object.keys(data);

        tmp = keys.reduce((acc, key) => {

            acc[key] = prepareToStamp(data[key]);

            if (acc[key] == undefined) {

                acc[key] = 'undefined';
            }

            return acc;
        }, {});
    }

    return tmp;
};

const nowHR = d => {
    return (new Date(d)).toISOString().substring(0, 23).replace(/[\.T]/g, ' ');
};

const now = d => {

    if (d) {

        return (new Date(d)).getTime()
    }

    return (new Date()).getTime()
};

const Bag = function (maxRequests, withinTimeMS, checkInterval = 300) {

    if ( typeof maxRequests !== 'number' || ! Number.isInteger(maxRequests) || maxRequests < 1 ) {

        throw new Error(`cache.js:throttle(maxRequests, withinTimeMS): maxRequests should be positive integer, it is: ` + JSON.stringify(maxRequests));
    }

    if ( typeof withinTimeMS !== 'number' || ! Number.isInteger(withinTimeMS) || withinTimeMS < 1 ) {

        throw new Error(`cache.js:throttle(maxRequests, withinTimeMS): withinTimeMS should be positive integer, it is: ` + JSON.stringify(withinTimeMS));
    }

    if ( typeof checkInterval !== 'number' || ! Number.isInteger(checkInterval) || checkInterval < 50) {

        throw new Error(`cache.js:throttle(maxRequests, withinTimeMS, checkInterval): checkInterval should be positive integer > 50, it is: ` + JSON.stringify(checkInterval));
    }

    const cache = {};

    let count   = 0;

    let handler = false;

    function clean () {

        const keys = Object.keys(cache);

        const n = now();

        let t;

        for (let i = 0, l = keys.length ; i < l ; i += 1 ) {

            if (cache) {

                t = cache[keys[i]];

                // console.log(`t: ${t.n}\nn: ${n}\n`);

                if (t.n < n) {

                    delete cache[keys[i]];

                    count -= 1;
                }
            }
        }
    }

    this.isMax = function () {

        return count === maxRequests;
    }

    this.count = function () { return count };

    this.clean = function () {

        return clean();
    };
    this.getClosestDelay = function (scheduled, callback, n) {

        if (handler) {

            return;
        }

        if ( ! n ) {

            n = now();
        }

        if ( scheduled.length === 0 ) {

            return;
        }

        setTimeout(callback, checkInterval);
    }
    this.add = function (key, value, n, cachefor) {

        if (value === undefined) {

            throw new Error(`Bag:add(): value can't be undefined`);
        }

        if (cachefor !== undefined) {

            if ( typeof cachefor !== 'number' || ! Number.isInteger(cachefor) || cachefor < 0) {

                throw new Error(`cache.js:add(cachefor): cachefor should be positive integer > 0, it is: ` + JSON.stringify(cachefor));
            }
        }

        if (this.isMax()) {

            throw new Error(`Bag:isMax() -> true`);
        }

        if ( this.has(key) ) {

            throw new Error(`Bag:add(): key '${key}' already exists`);
        }

        if ( ! n ) {

            n = now();
        }

        cache[key] = {
            n : n + (cachefor || withinTimeMS),
            value,
        };

        count += 1;

        return this;
    }
    this.get = function (key) {

        const tmp = cache[key];

        if (tmp !== undefined) {

            return tmp.value;
        }
    };
    this.has = function (key) {

        // log.dump({
        //     cache,
        // })

        return cache[key] !== undefined;
    };
    this.remove = function (key) {

        if ( this.has(key) ) {

            delete cache[key];

            count -= 1;
        }

        return this;
    }
    this.inspect = function () {
        return cache;
    }
}

const throttle = (maxRequests, withinTimeMS, checkInterval = 50) => {

    // console.log('throttle create...');

    const promises = new Bag(maxRequests, withinTimeMS, checkInterval);

    let scheduled = [];

    let lastInfo;

    function trigger() {

        // process.stdout.write('t');

        promises.clean();

        promises.getClosestDelay(scheduled, () => trigger());

        if ( ! promises.isMax() ) {

            const set = scheduled.shift();

            if (set) {

                const {
                    t,
                    key,
                    createPromise,
                    resolve,
                    reject,
                } = set;

                let promise;

                try {

                    promise = createPromise();
                }
                catch (e) {

                    reject(e);

                    promise = Promise.reject(e);
                }

                promise = Promise.resolve(promise);

                promise.then(resolve, reject);

                promises.add(key, promise, undefined, t);
            }
        }

        const tmp = [];

        let t;


        // console.log('');
        // console.log('l: '+scheduled.length);

        for (let i = 0, l = scheduled.length ; i < l ; i += 1 ) {

            t = scheduled[i];

            if (promises.has(t.key)) {

                // console.log(t.key + ': trigger');

                promises.get(t.key).then(t.resolve, t.reject);
            }
            else {
                // console.log(t.key);

                tmp.push(t);
            }
        }

        scheduled = tmp;
    };

    const tool = (forKey, createPromise, cachefor) => {

        // log.dump({
        //     forKey,
        //     add: now(),
        // })

        lastInfo    = undefined;

        const n     = now();

        const key   = sha256(prepareToStamp(forKey));

        promises.clean();

        if (promises.has(key)) {

            lastInfo = 'from cache';

            return promises.get(key);
        }

        if (promises.isMax()) {

            // log.dump({
            //     schedule: true
            // });

            let resolve, reject;

            const promise = new Promise((res, rej) => {
                resolve     = res;
                reject      = rej;
            });

            const c = {
                key,
                createPromise,
                resolve,
                reject,
            };

            if (cachefor) {

                c.t = cachefor;
            }

            scheduled.push(c);

            trigger();

            promises.getClosestDelay(scheduled, () => trigger(), n);

            lastInfo = 'scheduled';

            return promise;
        }
        else {

            // log.dump({
            //     live: true,
            // })

            let result;

            try {

                result = createPromise();
            }
            catch (e) {

                // log.dump({
                //     errrrrr: e
                // })

                result = Promise.reject(e);
            }

            const promise = Promise.resolve(result);

            promises.add(key, promise, n, cachefor);

            trigger();

            lastInfo = 'live';

            return promise;
        }
    }

    tool.inspect = () => ({
        promises: promises.inspect(),
        scheduled,
    });

    tool.lastInfo = () => lastInfo;

    return tool;
};

module.exports = {
    prepareToStamp,
    throttle,
    now,
    nowHR,
    Bag,
}