const { first, two, three, four, five, six, eight, nine } = require("./SimpleObserver_testEvents.js");
/**
 * TYPE=unit /bin/bash jest.sh --watchAll tests/nlab/SimpleObserver.jasmine.unit.js
 * NODE_API_PORT=4273 /bin/bash jasmine/test.sh --env .env --test tests/nlab/SimpleObserver.jasmine.unit.js
 */
describe("SimpleObserver", () => {
  it("first", (done) => {
    (async function () {
      try {
        const data = await first();

        // console.log(JSON.stringify(data, null, 4));

        expect(data).toEqual({
          one: "data",
          two: "data",
        });

        done();
      } catch (e) {
        done({
          first: e,
        });
      }
    })();
  });

  it("two", (done) => {
    (async function () {
      try {
        const data = await two();

        // console.log(JSON.stringify(data, null, 4));

        expect(data).toEqual({
          one: "data",
        });

        done();
      } catch (e) {
        done({
          first: e,
        });
      }
    })();
  });

  it("three", (done) => {
    (async function () {
      try {
        const data = await three();

        // console.log(JSON.stringify(data, null, 4));

        expect(data).toEqual({
          event: "data",
          i0: 0,
          i1: 1,
        });

        done();
      } catch (e) {
        done({
          first: e,
        });
      }
    })();
  });

  it("four", (done) => {
    (async function () {
      try {
        const data = await four();

        // console.log(JSON.stringify(data, null, 4));

        expect(data).toEqual({});

        done();
      } catch (e) {
        done({
          first: e,
        });
      }
    })();
  });

  it("five", (done) => {
    (async function () {
      try {
        const data = await five();

        // console.log(JSON.stringify(data, null, 4));

        expect(data).toEqual({
          event: "data",
          i0: 0,
          event2: "data",
          k0: 0,
          k1: 1,
          i1: 1,
        });

        done();
      } catch (e) {
        done({
          first: e,
        });
      }
    })();
  });

  it("six", (done) => {
    (async function () {
      try {
        const data = await six();

        // console.log(JSON.stringify(data, null, 4));

        expect(data).toEqual({
          event: "data",
          i0: 0,
          i1: 1,
        });

        done();
      } catch (e) {
        done({
          first: e,
        });
      }
    })();
  });

  it("eight", (done) => {
    (async function () {
      try {
        const data = await eight();

        // console.log(JSON.stringify(data, null, 4));

        expect(data).toEqual({
          "event-0-data1": 0,
          "event2-0-data1": 0,
          "event-1-data1": 1,
          "event2-1-data1": 1,
          "event-2-data2": 2,
          "event-3-data2": 3,
        });

        done();
      } catch (e) {
        done({
          first: e,
        });
      }
    })();
  });

  it("nine", (done) => {
    (async function () {
      try {
        const data = await nine();

        // console.log(JSON.stringify(data, null, 4));

        expect(data).toEqual({});

        done();
      } catch (e) {
        done({
          first: e,
        });
      }
    })();
  });
});
