// //'use strict';

const CachePromise = require("nlab/CachePromise.js");

const log = require("inspc");

const delay = require("nlab/delay.js");

it("CachePromise - simple", (done) => {
  (async function () {
    try {
      const cachePromise = new CachePromise();

      const mainPromise = cachePromise.get({ a: "b1" }, () => new Promise((res) => setTimeout(res, 10, "abc")));

      const data = await mainPromise;

      expect(data).toEqual("abc");

      done();
    } catch (e) {
      // log.dump({
      //     e,
      // })

      done({
        error: e,
      });
    }
  })();
});

it("CachePromise - double cached", (done) => {
  (async function () {
    try {
      const cachePromise = new CachePromise();

      let mainPromise = cachePromise.get({ a: "b2" }, () => new Promise((res) => setTimeout(res, 10, "abc")));

      let data = await mainPromise;

      expect(data).toEqual("abc");

      mainPromise = cachePromise.get({ a: "b2" }, () => new Promise((res) => setTimeout(res, 10, "abcd")));

      data = await mainPromise;

      expect(data).toEqual("abc");

      done();
    } catch (e) {
      // log.dump({
      //     e,
      // })

      done({
        error: e,
      });
    }
  })();
});

it("CachePromise - double refreshed", (done) => {
  (async function () {
    try {
      const cachePromise = new CachePromise({
        ttlms: 5,
      });

      let mainPromise = cachePromise.get({ a: "b3" }, () => new Promise((res) => setTimeout(res, 5, "abc")));

      let data = await mainPromise;

      expect(data).toEqual("abc");

      await delay(15);

      mainPromise = cachePromise.get({ a: "b3" }, () => new Promise((res) => setTimeout(res, 5, "abcd")));

      data = await mainPromise;

      expect(data).toEqual("abcd");

      done();
    } catch (e) {
      done({
        error: e,
      });
    }
  })();
});

it("CachePromise - rejected", (done) => {
  (async function () {
    try {
      const cachePromise = new CachePromise();

      await cachePromise.get("rej", () => Promise.reject("abcr"));

      done(`Shouldn't resolve1`);
    } catch (e) {
      expect(e).toEqual("abcr");

      done();
    }
  })();
});

it("CachePromise - rejected expired flag off", (done) => {
  (async function () {
    const key = "flagoff";

    try {
      const cachePromise = new CachePromise({
        ttlms: 10,
      });

      await cachePromise.get(key, () => Promise.reject("abcd"));

      await delay(100);

      done(`Shouldn't resolve2`);
    } catch (e) {
      expect(e).toEqual("abcd");

      done();
    }
  })();
});

it("CachePromise - rejected expired flag off", (done) => {
  (async function () {
    const key = "flagoff2";

    try {
      const cachePromise = new CachePromise({
        ttlms: 10,
      });

      await cachePromise.get(key, () => Promise.resolve("abc"));

      await delay(100);

      await cachePromise.get(key, () => Promise.reject("abcd"));

      done(`Shouldn't resolve2`);
    } catch (e) {
      expect(e).toEqual("abcd");

      done();
    }
  })();
});

it("CachePromise - rejected expired flag off", (done) => {
  (async function () {
    const key = "flagoff3";

    try {
      const cachePromise = new CachePromise({
        ttlms: 10,
        returnExpiredCacheIfRejected: true,
      });

      await cachePromise.get(key, () => Promise.resolve("abc"));

      await delay(100);

      const data = await cachePromise.get(key, () => Promise.reject("abcd"));

      expect(data).toEqual("abc");

      done();
    } catch (e) {
      done(`Shouldn't reject`);
    }
  })();
});

it("CachePromise - returnExpiredCacheIfRejected = true on first call", (done) => {
  (async function () {
    const key = "flagoff4";

    try {
      const cachePromise = new CachePromise({
        ttlms: 10,
        returnExpiredCacheIfRejected: true,
      });

      await cachePromise.get(key, () => Promise.reject("abc"));

      done(`Shouldn't resolve`);
    } catch (e) {
      expect(String(e)).toEqual("abc");

      done();
    }
  })();
});

// // for coverage

it(`CachePromise - can't serialise`, (done) => {
  (async function () {
    const key = {
      obj: "true",
    };

    key.key = key;

    try {
      const cachePromise = new CachePromise();

      await cachePromise.get(key, () => Promise.reject("abc"));

      done(`Shouldn't resolve`);
    } catch (e) {
      expect(String(e).includes("circular")).toEqual(true);

      done();
    }
  })();
});

it(`CachePromise - can't serialise`, (done) => {
  (async function () {
    const key = "ttl err 1";

    try {
      const cachePromise = new CachePromise({
        ttlms: -1,
      });

      await cachePromise.get(key, () => Promise.reject("abc"));

      done(`Shouldn't resolve`);
    } catch (e) {
      expect(String(e)).toEqual("Error: CachePromise error: ttlms can't be smaller than 1");

      done();
    }
  })();
});

it(`CachePromise - ttlms < 1`, (done) => {
  (async function () {
    try {
      new CachePromise({
        ttlms: -1,
      });

      done(`Shouldn't resolve`);
    } catch (e) {
      expect(String(e)).toEqual("Error: CachePromise error: ttlms can't be smaller than 1");

      done();
    }
  })();
});

it(`CachePromise - undefined instead of string`, (done) => {
  (async function () {
    try {
      const cachePromise = new CachePromise();

      await cachePromise.get(undefined, () => Promise.reject("abc"));

      done(`Shouldn't resolve`);
    } catch (e) {
      expect(String(e)).toEqual("Error: CachePromise error: key after being serialised is not a string");

      done();
    }
  })();
});

it(`CachePromise - not integer`, (done) => {
  (async function () {
    try {
      new CachePromise({
        ttlms: 8.8,
      });

      done(`Shouldn't resolve`);
    } catch (e) {
      expect(String(e)).toEqual("Error: CachePromise error: ttlms is not an integer");

      done();
    }
  })();
});

it(`CachePromise - not a function`, (done) => {
  (async function () {
    try {
      const cachePromise = new CachePromise();

      await cachePromise.get("test", undefined);

      done(`Shouldn't resolve`);
    } catch (e) {
      expect(String(e)).toEqual("Error: CachePromise error: getPromise is not a function");

      done();
    }
  })();
});

it(`CachePromise - size`, (done) => {
  (async function () {
    try {
      const cachePromise = new CachePromise();

      await cachePromise.get("test", () => Promise.resolve("test"));

      await cachePromise.get("test2", () => Promise.resolve("test"));

      expect(cachePromise.size()).toEqual(2);

      done();
    } catch (e) {
      done(`Shouldn't reject: ${e}`);
    }
  })();
});

it(`CachePromise - async`, (done) => {
  (async function () {
    try {
      const key = "async";

      const cachePromise = new CachePromise({
        ttlms: 10,
      });

      await cachePromise.get(key, async () => "test");

      await delay(50);

      const data = await cachePromise.get(key, async () => "test2");

      expect(data).toEqual("test2");

      done();
    } catch (e) {
      done(`Shouldn't reject: ${e}`);
    }
  })();
});
