"use strict";

const throttlePromises = require("../../throttlePromises");

const log = require("inspc");

const cache = throttlePromises({
  requests: 10,
  perTimeMsec: 1.5 * 1000,
  dump: (data) => {
    // log && log(data);
    // iolog('data', data);
  },
});

it("throttlePromises() - simple", (done) => {
  (async function () {
    try {
      const mainPromise = cache({}, () => new Promise((res) => setTimeout(res, 10, "testdata")), 10000, false);

      const data = await mainPromise;

      expect(data).toEqual("testdata");

      done();
    } catch (e) {
      // log.dump({
      //     e,
      // })

      throw e;
    }
  })();
});
