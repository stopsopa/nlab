"use strict";

const delay = require("../../delay");

const then = delay.then;

const { start, diff } = require("./timer");

try {
  jest.setTimeout(100);
} catch (e) {}

/**
 * Resolve:
 */

it("delay - get delayed promise with payload", (done) => {
  (async function () {
    start();

    const d = 50;

    delay(d, "ok").then((data) => {
      expect(data).toEqual("ok");

      expect(diff()).toBeGreaterThanOrEqual(d - 5);

      done();
    });
  })();
});

it("delay - pass payload manually", (done) => {
  (async function () {
    start();

    const d = 50;

    Promise.resolve("msg")
      .then(
        (dd) => delay(d, dd),
        (dd) => delay.reject(d, dd)
      )
      .then((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeGreaterThanOrEqual(d - 5);

        done();
      });
  })();
});

it("delay - pass payload transparently", (done) => {
  (async function () {
    start();

    const d = 50;

    Promise.resolve("msg")
      .then(
        (data) => delay(d, data),
        (data) => delay.reject(d, data)
      )
      .then((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeGreaterThanOrEqual(d - 5);

        done();
      });
  })();
});

it("delay - pass payload transparently - immediately", (done) => {
  (async function () {
    start();

    Promise.resolve("msg")
      .then((data) => delay(undefined, data))
      .then((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeLessThanOrEqual(10);

        done();
      });
  })();
});

/**
 * Reject:
 */

it("reject - get delayed promise with payload", (done) => {
  (async function () {
    start();

    const d = 50;

    delay.reject(d, "ok").catch((data) => {
      expect(data).toEqual("ok");

      expect(diff()).toBeGreaterThanOrEqual(d - 5);

      done();
    });
  })();
});

it("reject - pass payload manually", (done) => {
  (async function () {
    start();

    const d = 50;

    Promise.reject("msg")
      .then(
        (data) => delay(d, data),
        (data) => delay.reject(d, data)
      )
      .catch((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeGreaterThanOrEqual(d - 5);

        done();
      });
  })();
});

it("reject - pass payload transparently", (done) => {
  (async function () {
    start();

    const d = 50;

    Promise.reject("msg")
      .then(
        (data) => delay(d, data),
        (data) => delay.reject(d, data)
      )
      .catch((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeGreaterThanOrEqual(d - 5);

        done();
      });
  })();
});

it("reject - pass payload transparently - immediately", (done) => {
  (async function () {
    start();

    Promise.reject("msg")
      .then(
        (data) => delay(undefined, data),
        (data) => delay.reject(undefined, data)
      )
      .catch((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeLessThanOrEqual(10);

        done();
      });
  })();
});

it("then - resolve", (done) => {
  (async function () {
    start();

    const d = 50;

    return Promise.resolve("msg")
      .then(...then(d))
      .then((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeGreaterThanOrEqual(d - 5);

        done();
      });
  })();
});

it("then - reject", (done) => {
  (async function () {
    start();

    const d = 50;

    Promise.reject("msg")
      .then(...then(d))
      .catch((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeGreaterThanOrEqual(d - 5);

        done();
      });
  })();
});

it("then - resolve - immediately", (done) => {
  (async function () {
    start();

    Promise.resolve("msg")
      .then(...then())
      .then((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeLessThanOrEqual(10);

        done();
      });
  })();
});

it("then - reject - immediately", (done) => {
  (async function () {
    start();

    Promise.reject("msg")
      .then(...then())
      .catch((dd) => {
        expect(dd).toEqual("msg");

        expect(diff()).toBeLessThanOrEqual(10);

        done();
      });
  })();
});

it("then - delay async", (done) => {
  (async function () {
    start();

    const d = 50;

    await delay(d);

    expect(diff()).toBeGreaterThanOrEqual(d - 5);

    done();
  })();
});
