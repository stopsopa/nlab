const th = (msg) => new Error(`CachePromise error: ${msg}`);

/**
 * Test and coverage: https://github.com/stopsopa/nlab
 */
function CachePromise(opt) {
  this.opt = opt = {
    ttlms: 1 * 1000,
    returnExpiredCacheIfRejected: false,
    ...opt,
  };

  if (!Number.isInteger(opt.ttlms)) {
    throw th(`ttlms is not an integer`);
  }

  if (opt.ttlms < 1) {
    throw th(`ttlms can't be smaller than 1`);
  }

  this.cache = {};
}

CachePromise.prototype.get = async function (
  key,
  getPromise,
  event = () => {}
) {
  let buff;

  try {
    key = JSON.stringify(key);
  } catch (e) {
    throw th(`can't serialise the key: ${e}`);
  }

  try {
    if (typeof key !== "string") {
      throw th(`key after being serialised is not a string`);
    }

    if (typeof getPromise !== "function") {
      throw th(`getPromise is not a function`);
    }

    buff = this.cache[key];

    const n = Date.now();

    if (typeof buff === "undefined" || n - buff.n >= this.opt.ttlms) {
      const p = Promise.resolve(getPromise());

      await p;

      this.cache[key] = {
        n,
        p,
      };

      event("live");
    } else {
      event("cache", false);
    }

    return this.cache[key].p;
  } catch (e) {
    if (typeof buff !== "undefined" && this.opt.returnExpiredCacheIfRejected) {
      event("cache", true);

      return buff.p;
    }

    event("error");

    throw e;
  }
};

CachePromise.prototype.size = function () {
  return Object.keys(this.cache).length;
};

module.exports = CachePromise;
