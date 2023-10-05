const sha256 = require("./sha256");

const prepareToStamp = require("./prepareToStamp");

// const log                   = require('inspc');

const now = (d) => {
  if (d) {
    return new Date(d).getTime();
  }

  return new Date().getTime();
};

/**
 * Purpose of this library is to reduce numbers of request to certain amout per given time, not more - that's the main goal
 * all rest is just optimizing to use those request in most efficient way to serve individual http responses
 */
const tool = function (opt) {
  const { requests, perTimeMsec, dump } = Object.assign(
    {
      dump: false,
    },
    opt,
  );

  if (!(typeof dump === "function" || dump === false)) {
    throw new Error(`promiseThrottle: dump must be a function or boolean`);
  }

  if (!Number.isInteger(requests) || requests < 1) {
    throw new Error(`promiseThrottle(): requests should be positive integer, it is: ` + JSON.stringify(requests));
  }

  if (!Number.isInteger(perTimeMsec) || perTimeMsec < 1) {
    throw new Error(`promiseThrottle(): perTimeMsec should be positive integer, it is: ` + JSON.stringify(perTimeMsec));
  }

  let t,
    last = {
      // [hash]: expire_time_integer
    };

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

    let lastKeys = Object.keys(last);

    let lastNum = lastKeys.length;

    let nextTrigger = perTimeMsec;

    let tt, i, l;

    for (i = 0, l = lastKeys.length; i < l; i += 1) {
      t = last[lastKeys[i]];

      if (t < n) {
        delete last[lastKeys[i]];

        lastNum -= 1;
      } else {
        tt = t - n;

        if (tt < nextTrigger) {
          nextTrigger = tt;
        }
      }
    }

    lastKeys = Object.keys(cache);

    for (i = 0, l = lastKeys.length; i < l; i += 1) {
      t = cache[lastKeys[i]].e;

      if (t < n) {
        delete cache[lastKeys[i]];
      }
    }

    return [nextTrigger, lastNum];
  }

  function triggerScheduled() {
    const tmp = [];

    for (let i = 0, l = schedule.length; i < l; i += 1) {
      t = schedule[i];

      if (cache[t.key]) {
        cache[t.key].p.then(t.resolve, t.reject);
      } else {
        tmp.push(t);
      }
    }

    schedule = tmp;
  }

  function sendScheduled(nextTrigger, tool, dump) {
    if (handler || schedule.length === 0) {
      return;
    }

    setTimeout(() => {
      handler = false;

      const n = now();

      const [nextTrigger, lastNum] = cleanAndReturnNextCleanTimeoutTime(n);

      triggerScheduled();

      const sendHowMany = requests - lastNum;

      if (sendHowMany > 0) {
        for (let i = 0; i < sendHowMany; i += 1) {
          const set = schedule.shift();

          if (set) {
            const { keepInCacheForMsec, key, createPromise, resolve, reject } = set;

            let promise;

            try {
              promise = createPromise();
            } catch (e) {
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

      sendScheduled(nextTrigger, tool, dump);

      dump &&
        dump({
          time: now(),
          event: `sendScheduled`,
          inspect: tool.inspect(),
          lastInfo: tool.lastInfo(),
        });
    }, nextTrigger);
  }

  const tool = function (forKey, createPromise, keepInCacheForMsec, forceLive = false) {
    if (!Number.isInteger(keepInCacheForMsec) || keepInCacheForMsec < 1) {
      throw new Error(
        `throttlePromies(forKey, createPromise, keepInCacheForMsec): keepInCacheForMsec should be positive integer, it is: ` +
          JSON.stringify(keepInCacheForMsec),
      );
    }

    if (keepInCacheForMsec < perTimeMsec) {
      throw new Error(
        `throttlePromies(forKey, createPromise, keepInCacheForMsec): keepInCacheForMsec [${keepInCacheForMsec}] can't be smaller than perTimeMsec [${perTimeMsec}] given in main function throttlePromies(requests, perTimeMsec)`,
      );
    }

    if (typeof createPromise !== "function") {
      throw new Error(
        `throttlePromies(forKey, createPromise, keepInCacheForMsec): createPromise is not a funciton, it is: ` +
          JSON.stringify(createPromise),
      );
    }

    if (forKey === undefined) {
      throw new Error(
        `throttlePromies(forKey, createPromise, keepInCacheForMsec): forKey can't be undefined, it is: ` +
          JSON.stringify(forKey),
      );
    }

    if (forceLive) {
      lastInfo = "forcelive";

      return createPromise();
    }

    const n = now();

    const [nextTrigger, lastNum] = cleanAndReturnNextCleanTimeoutTime(n);

    const key = sha256(JSON.stringify(prepareToStamp(forKey)));

    if (cache[key]) {
      lastInfo = "cache";

      dump &&
        dump({
          time: now(),
          event: `cache[${key}]`,
          inspect: tool.inspect(),
          lastInfo: tool.lastInfo(),
        });

      return cache[key].p;
    }

    let promise;

    if (lastNum < requests) {
      last[key] = n + perTimeMsec;

      promise = createPromise();

      cache[key] = {
        e: n + keepInCacheForMsec,
        p: promise,
      };

      triggerScheduled();

      lastInfo = "live";

      dump &&
        dump({
          time: now(),
          event: `live: ${key}`,
          inspect: tool.inspect(),
          lastInfo: tool.lastInfo(),
        });
    } else {
      let resolve, reject;

      promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });

      schedule.push({
        keepInCacheForMsec,
        key,
        createPromise,
        resolve,
        reject,
      });

      sendScheduled(nextTrigger, tool, dump);

      lastInfo = "scheduled";

      dump &&
        dump({
          time: now(),
          event: `scheduled: ${key}`,
          inspect: tool.inspect(),
          lastInfo: tool.lastInfo(),
        });
    }

    return promise;
  };

  tool.lastInfo = () => lastInfo;

  tool.inspect = () => {
    const n = now();

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

  tool.clear = () => {
    cleanAndReturnNextCleanTimeoutTime();

    dump &&
      dump({
        time: now(),
        event: `clear`,
        inspect: tool.inspect(),
        lastInfo: tool.lastInfo(),
      });
  };

  tool.trigger = () => {
    cleanAndReturnNextCleanTimeoutTime();

    triggerScheduled();

    dump &&
      dump({
        time: now(),
        event: `trigger`,
        inspect: tool.inspect(),
        lastInfo: tool.lastInfo(),
      });
  };

  return tool;
};

tool.now = now;

module.exports = tool;
