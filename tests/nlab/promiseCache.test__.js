const { start, diff } = require("./timer");

const promiseCache = require("../../promiseCache");

const log = require("inspc");

const delay = require("../../src/delay");

const unique = require("../../src/unique");

const { prepareToStamp, throttle, nowHR, now } = promiseCache;

try {
  jest.setTimeout(1400);
} catch (e) {}

it("throttle second from cache in withinTimeMS", async (done) => {
  const throttler = throttle(2, 100, 50);

  const r1 = await throttler("key", () => delay(40, "first"));

  expect(r1).toEqual("first");

  expect(throttler.lastInfo()).toEqual("live");

  const r2 = await throttler("key", () => delay(40, "second"));

  expect(r2).toEqual("first");

  expect(throttler.lastInfo()).toEqual("from cache");

  done();
});

it("throttle second live, beyond withinTimeMS", async (done) => {
  const throttler = throttle(2, 20, 50);

  const r1 = await throttler("key", () => delay(40, "first"));

  expect(r1).toEqual("first");

  expect(throttler.lastInfo()).toEqual("live");

  const r2 = await throttler("key", () => delay(40, "second"));

  expect(r2).toEqual("second");

  expect(throttler.lastInfo()).toEqual("live");

  done();
});

it("throttle second live, beyond withinTimeMS", async (done) => {
  const throttler = throttle(2, 100, 50);

  const r1 = await throttler("key", () => delay(40, "first")); // 40

  expect(r1).toEqual("first");

  expect(throttler.lastInfo()).toEqual("live");

  await delay(40); // 40

  const r2 = await throttler("key", () => delay(40, "second")); // 0

  expect(r2).toEqual("first");

  expect(throttler.lastInfo()).toEqual("from cache");

  await delay(40); // 40

  const r3 = await throttler("key", () => delay(40, "thrid"));

  expect(r3).toEqual("thrid");

  expect(throttler.lastInfo()).toEqual("live");

  await delay(40);

  const r4 = await throttler("key", () => delay(40, "forth"));

  expect(r4).toEqual("thrid");

  expect(throttler.lastInfo()).toEqual("from cache");

  done();
});

it("throttle second live, beyond withinTimeMS", async (done) => {
  const s = now();

  const throttler = throttle(1, 100, 50);

  const r1 = await throttler("key1", () => delay(40, "first")); // 40

  expect(r1).toEqual("first");

  expect(throttler.lastInfo()).toEqual("live");

  // await delay(40); // 40

  const r2 = await throttler("key2", () => delay(40, "second")); // 0

  expect(r2).toEqual("second");

  expect(throttler.lastInfo()).toEqual("scheduled");

  const pr3 = throttler("key3", () => delay(40, "thrid")); // 0

  const pr4 = throttler("key4", () => delay(40, "forth")); // 0

  const r3 = await pr3;

  const r4 = await pr4;

  expect(r3).toEqual("thrid");

  expect(throttler.lastInfo()).toEqual("scheduled");

  done();
});

it("throttle crash 2", async (done) => {
  try {
    const s = now();

    const throttler = throttle(1, 100, 50);

    const r1 = await throttler("key1", () => "test"); // 40

    const r2 = await throttler("key2", () => {
      throw new Error(`error2`);
    }); // 40
  } catch (e) {
    expect(e.message).toEqual("error2");

    done();
  }
});

it("throttle crash", async (done) => {
  try {
    const s = now();

    const throttler = throttle(1, 100);

    const r1 = await throttler("key1", () => {
      throw new Error(`error1`);
    }); // 40
  } catch (e) {
    expect(e.message).toEqual("error1");

    done();
  }
});
