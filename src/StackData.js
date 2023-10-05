/**
 * https://nodejs.org/api/async_hooks.html
 *
 *

 const stack = new StackData({
        expireAfterSec              : 30,
        triggerClearAfterNMapSet    : 20,
        prefix                      : '__stack_data__',
        debug                       : true
    });
 */
const log = (...args) => process._rawDebug(args.join(" "));

const map = new Map();

const bag = new Map();

const max = Number.MAX_SAFE_INTEGER;

const len = (max + "").length;

let last = false;

let i = 0;

function getStackTrace(msg) {
  try {
    throw new Error(msg);
  } catch (e) {
    return e.stack;
  }
}

function now() {
  return parseInt(Date.now() / 1000, 10);
}

const async_hooks = require("async_hooks");

const next = function () {
  if (i === max) {
    i = 0;
  }

  i += 1;

  return i;
};

const call = function (name, fn) {
  var func = new Function("return function " + name + "(fn){return fn()}")();

  func(fn);
};

const fnreg = /^[_a-z][_a-z\d]{6,20}$/;

/**
 * - clean after expire
 * @param expireAfterSec
 * @param prefix
 */

let created = false;

module.exports = function (opt) {
  let nset = 0;
  let gctime = now();

  const { expireAfterSec, triggerClearAfterNMapSet, prefix, debug } = Object.assign(
    {
      expireAfterSec: undefined,
      triggerClearAfterNMapSet: 300,
      prefix: "__stack_data__",
      debug: false,
    },
    opt,
  );

  if (created) {
    throw `Only one instance of 'new Stack()' possible to create`;
  } else {
    created = true;
  }

  if (expireAfterSec < 20) {
    throw `expireAfterSec < 20 sec`;
  }

  if (triggerClearAfterNMapSet < 20) {
    throw `triggerClearAfterNMapSet < 20 iterations`;
  }

  if (typeof prefix !== "string") {
    throw `prefix is not string`;
  }

  if (!fnreg.test(prefix)) {
    throw `given prefix don't match : ` + (fnreg + "");
  }

  const gc = (function () {
    let lock = false;
    return function gc() {
      if (lock) {
        return;
      }

      lock = true;

      (function () {
        // const t = [];

        for (const [k, v] of bag) {
          if (Math.abs(gctime - v.now) > expireAfterSec) {
            // log('bag2: ', k, (v.now - gctime > expireAfterSec) ? 'true' : 'false', v.now);
            //
            // log('REMOVE: ', k);

            // log('bag remote'.repeat('bag repeat' + "\n"))

            bag.delete(k);
          }

          // (t.length < 100) && t.push(k + ' - ' + (v.now - gctime) );
        }

        // log(t.join(', '))
      })();

      (function () {
        for (const [key, val] of map) {
          if (Math.abs(gctime - val.now) > expireAfterSec) {
            map.delete(key);
          }
        }
      })();

      // log('gc ', ' map: ', map.size, ' bag: ', bag.size);

      nset = 0;

      gctime = now();

      lock = false;
    };
  })();

  const pl = prefix.length;

  this.call = function (data, fn) {
    const n = next();

    // log('set')

    bag.set(n, {
      now: now(),
      data,
    });

    const name = prefix + (n + "").padStart(len, 0);

    // log('fn name: >>>', name, '<<<');

    call(name, fn);
  };

  this.get = (clear = false) => {
    if (bag.has(last)) {
      const data = bag.get(last).data;

      if (clear) {
        bag.delete(last);

        last = false;
      }

      return data;
    }
  };

  if (debug) {
    this.map = map;

    this.bag = bag;
  }

  this.getStackTrace = getStackTrace;

  function find(d) {
    return d
      .split("\n")
      .map((d) => {
        d = d.trim();

        if (d.indexOf("at ") === 0) {
          d = d.substring(3);

          if (d.indexOf(prefix) === 0) {
            d = d.substr(pl, len);

            if (d) {
              let i = 0;

              while (d[i] === "0") {
                i += 1;
              }

              return parseInt(d.substr(i), 10);
            }
          }
        }

        return false;
      })
      .find(Boolean);
  }

  const common = function (asyncId) {
    let f;

    if (map.has(asyncId)) {
      f = map.get(asyncId).data;
    } else {
      f = find(getStackTrace());
    }

    if (f) {
      if (!map.has(asyncId)) {
        // log('set')

        map.set(asyncId, {
          now: now(),
          data: f,
        });

        nset += 1;

        nset > triggerClearAfterNMapSet && gc();
      }

      last = f;
    }

    // log('before', asyncId, 'before trace: ', f, 'len: ', map.size)
  };

  const asyncHook = async_hooks.createHook({
    init: function (asyncId, type, triggerAsyncId, resource) {
      let f = find(getStackTrace());

      // if (f) {
      //
      //     log('>>>', getStackTrace(), '<<<')
      // }

      if (!f) {
        if (map.has(triggerAsyncId)) {
          f = map.get(triggerAsyncId).data;
        } else if (map.has(asyncId)) {
          f = map.get(asyncId).data;
        }
      }

      if (f) {
        if (!map.has(asyncId)) {
          // log('set')

          map.set(asyncId, {
            now: now(),
            data: f,
          });

          nset += 1;

          nset > triggerClearAfterNMapSet && gc();
        }

        if (!map.has(triggerAsyncId)) {
          // log('set')

          map.set(triggerAsyncId, {
            now: now(),
            data: f,
          });

          nset += 1;

          nset > triggerClearAfterNMapSet && gc();
        }
      }

      // log('init', asyncId, 'triggerAsyncId: ', triggerAsyncId, 'init trace: ', JSON.stringify(f), 'len: ', map.size)
    },
    before: common,
    promiseResolve: common,
    after: function (asyncId) {
      map.delete(asyncId);
    },
    destroy: function (asyncId) {
      map.delete(asyncId);
    },
  });

  asyncHook.enable();
};

/**
 *
 const log = (...args) => process._rawDebug(args.join(' '));

 const Stack = require('./Stack');

 const stack = new Stack({
    expireAfterSec              : 30,
    triggerClearAfterNMapSet    : 20,
    prefix                      : '__stack_data__',
    debug                       : true
});

 const asyncHooks = require('async_hooks');

 function a() {

    b()
}

 function b() {
    setInterval(() => {

        c('one')
        c('two')
        c('three')
        c('four')
        c('six')
        c('seven')
        c('one')
        c('two')
        c('three')
        c('four')
        c('six')
        c('seven')
        c('one')
        c('two')
        c('three')
        c('four')
    }, 3000);
}

 function c(a) {

    const data = {my: a};

    stack.call(data, function () {
        d();
    });

    // setTimeout(() => {
    //     console.log(JSON.stringify(data, null, 4))
    // }, 5000);
}

 function d() {
    setTimeout(() => {

        const p = new Promise(function (res) {

            setTimeout(() => {


                const p = new Promise(function (res) {

                    setTimeout(() => {
                        res('test');
                    }, 200);
                })

                p.then(jj => res());

                // res('test');
            }, 200);
        })

        p.then(jj => e(jj))

    }, 400);
}

 function e(jj) {

    const data = stack.get();

    if (typeof data.my !== 'string') {


        process.exit(1)
    }

    // log('final data: ', JSON.stringify(stack.get()))
    // log('final map: ', stack.map.size)
    // log('final bag: ', stack.bag.size);

    data.set = 'new value';
}

 a()
 */
