"use strict";

const se = require("nlab/serializeError.js");

const log = require("inspc");

// jest.setTimeout(100);

it("se - regular Exception", (done) => {
  (async function () {
    try {
      throw new Error("test");
    } catch (e) {
      e = se(e);

      // console.log(JSON.stringify(e, null, 4), 10)

      delete e.stack;

      expect(e).toEqual({
        name: "Error",
        message: "test",
        // "stack": [
        //   "Error: test",
        //   "    at Object.<anonymous> (/Users/sd/Workspace/projects/nlab/runtime/test/nlab/se.test.js:13:15)",
        //   "    at /Users/sd/Workspace/projects/nlab/runtime/node_modules/jest-jasmine2/build/queueRunner.js:43:12",
        //   "    at new Promise (<anonymous>)",
        //   "    at mapper (/Users/sd/Workspace/projects/nlab/runtime/node_modules/jest-jasmine2/build/queueRunner.js:26:19)",
        //   "    at /Users/sd/Workspace/projects/nlab/runtime/node_modules/jest-jasmine2/build/queueRunner.js:73:41",
        //   "    at processTicksAndRejections (internal/process/task_queues.js:93:5)"
        // ]
      });

      done();
    }
  })();
});

it("se - function", (done) => {
  (async function () {
    let e = se(() => {});

    delete e.stack;

    expect(e).toEqual("[Function: anonymous]");

    done();
  })();
});

it("se - string function", (done) => {
  (async function () {
    let e = se("test");

    delete e.stack;

    expect(e).toEqual("test");

    done();
  })();
});

it("se - string native", (done) => {
  (async function () {
    let e = se("test", true);

    delete e.stack;

    expect(e).toEqual("test");

    done();
  })();
});

it("se - circular", (done) => {
  (async function () {
    var k = {
      c: {
        d: {},
      },
      f: [],
      h: {},
      i: false,
    };

    k.c.d.k = k;

    let e = se(k, true);

    // console.log(JSON.stringify(e, null, 4), 10)

    delete e.stack;

    expect(e).toEqual({
      c: {
        d: {
          k: "[Circular]",
        },
      },
      f: [],
      h: {},
      i: false,
    });

    done();
  })();
});
