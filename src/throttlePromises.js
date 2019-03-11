
const sha256                = require('./sha256');

const prepareToStamp        = require('./prepareToStamp');

// const log                   = require('inspc');

const now = d => {

    if (d) {

        return (new Date(d)).getTime()
    }

    return (new Date()).getTime()
};

/**
 * Purpose of this library is to reduce numbers of request to certain amout per given time, not more - that's the main goal
 * all rest is just optimizing to use those request in most efficient way to serve individual http responses
 */
const tool = function (requests, perTimeMsec) {

    if ( ! Number.isInteger(requests) || requests < 1 ) {

        throw new Error(`promiseThrottle(requests, perTimeMsec): requests should be positive integer, it is: ` + JSON.stringify(requests));
    }

    if ( ! Number.isInteger(perTimeMsec) || perTimeMsec < 1 ) {

        throw new Error(`promiseThrottle(requests, perTimeMsec): perTimeMsec should be positive integer, it is: ` + JSON.stringify(perTimeMsec));
    }

    let t, last = {
        // [hash]: expire_time_integer
    }

    let cache = {
        // [key]: {
        //     //e: //expire
        //     //p:
        // }
    };

    let schedule = [
        // {
        //     // k: hash
        //     resolve,
        //     reject,
        // }
    ];

    let handler = false;

    let lastInfo;

    function cleanAndReturnNextCleanTimeoutTime(n) {

        if (n === undefined) {

            n = now();
        }

        let lastKeys        = Object.keys(last);

        let lastNum         = lastKeys.length;

        let nextTrigger     = perTimeMsec;

        let tt, i, l;

        for ( i = 0, l = lastKeys.length ; i < l ; i += 1 ) {

            t = last[lastKeys[i]];

            if ( t < n ) {

                // log.dump({
                //     deleting_from_last: {
                //         t,
                //         n,
                //         key: lastKeys[i]
                //     }
                // }, 3);

                delete last[lastKeys[i]];

                lastNum -= 1;
            }
            else {

                tt = t - n;

                if ( tt < nextTrigger ) {

                    nextTrigger = tt;
                }
            }
        }

        lastKeys        = Object.keys(cache);

        for ( i = 0, l = lastKeys.length ; i < l ; i += 1 ) {

            t = cache[lastKeys[i]].e;

            if ( t < n ) {

                // log.dump({
                //     deleting_from_cache: {
                //         t,
                //         n,
                //         key: lastKeys[i],
                //     }
                // }, 3);

                delete cache[lastKeys[i]];
            }
        }

        // log.dump([
        //     nextTrigger,
        //     lastNum,
        // ])

        return [
            nextTrigger,
            lastNum,
        ];
    }

    function triggerScheduled() {

        const tmp = [];

        for ( let i = 0, l = schedule.length ; i < l ; i += 1 ) {

            t = schedule[i];

            if (cache[t.key]) {

                cache[t.key].p.then(t.resolve, t.reject);
            }
            else {

                tmp.push(t);
            }
        }

        schedule = tmp;
    }

    function sendScheduled(nextTrigger) {

        // log.dump({
        //     sendScheduled: {
        //         handler,
        //         schedule,
        //     }
        // }, 3)

        if ( handler || schedule.length === 0 ) {

            return;
        }

        setTimeout(() => {

            handler = false;

            const n                     = now();

            const [
                nextTrigger,
                lastNum
            ]                           = cleanAndReturnNextCleanTimeoutTime(n);

            // log.dump({
            //     nextTrigger_inside: nextTrigger
            // })

            triggerScheduled();

            const sendHowMany = requests - lastNum;

            if (sendHowMany > 0) {

                for ( let i = 0 ; i < sendHowMany ; i += 1 ) {

                    const set = schedule.shift();

                    if (set) {

                        const {
                            keepInCacheForMsec,
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

                        cache[key] = {
                            e: n + keepInCacheForMsec,
                            p: promise,
                        };
                    }
                }
            }

            sendScheduled(nextTrigger);

        }, nextTrigger);
    }

    const tool = function (forKey, createPromise, keepInCacheForMsec) {

        if ( ! Number.isInteger(keepInCacheForMsec) || keepInCacheForMsec < 1 ) {

            throw new Error(`throttlePromies(forKey, createPromise, keepInCacheForMsec): keepInCacheForMsec should be positive integer, it is: ` + JSON.stringify(keepInCacheForMsec));
        }

        if ( keepInCacheForMsec < perTimeMsec) {

            throw new Error(`throttlePromies(forKey, createPromise, keepInCacheForMsec): keepInCacheForMsec [${keepInCacheForMsec}] can't be smaller than perTimeMsec [${perTimeMsec}] given in main function throttlePromies(requests, perTimeMsec)`);
        }

        if ( typeof createPromise !== 'function' ) {

            throw new Error(`throttlePromies(forKey, createPromise, keepInCacheForMsec): createPromise is not a funciton, it is: ` + JSON.stringify(createPromise));
        }

        if ( forKey === undefined ) {

            throw new Error(`throttlePromies(forKey, createPromise, keepInCacheForMsec): forKey can't be undefined, it is: ` + JSON.stringify(forKey));
        }

        const n                     = now();

        const [
            nextTrigger,
            lastNum
        ]                           = cleanAndReturnNextCleanTimeoutTime(n);

        const key                   = sha256(JSON.stringify(prepareToStamp(forKey)));

        if (cache[key]) {

            lastInfo = 'cache';

            return cache[key].p;
        }

        let promise;

        // log.dump({
        //     requests,
        //     lastNum,
        //     nextTrigger,
        // })

        if ( lastNum < requests ) {

            last[key]       = n + perTimeMsec;

            promise   = createPromise();

            cache[key] = {
                e: n + keepInCacheForMsec,
                p: promise,
            }

            triggerScheduled();

            lastInfo = 'live';
        }
        else {

            let resolve, reject;

            promise = new Promise((res, rej) => {
                resolve     = res;
                reject      = rej;
            });

            schedule.push({
                keepInCacheForMsec,
                key,
                createPromise,
                resolve,
                reject,
            });

            sendScheduled(nextTrigger);

            lastInfo = 'scheduled';
        }

        return promise;
    }

    tool.lastInfo = () => lastInfo;

    tool.inspect = () => {

        const n = now()

        return {
            schedule,
            last,
            cache: Object.keys(cache).reduce((acc, key) => {

                acc[key] = Object.assign(cache[key], {
                    expireIn: (cache[key].e - n) / 1000,
                });

                return acc;
            }, {}),
        };
    };

    tool.clear = () => cleanAndReturnNextCleanTimeoutTime();

    tool.trigger = () => {

        cleanAndReturnNextCleanTimeoutTime();

        triggerScheduled();
    };

    return tool;
};

tool.now = now;

module.exports = tool;