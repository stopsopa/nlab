"use strict";

const cache = require("../../cachePromiseInterval");

const log = require("inspc");

const delay = require("../../delay");

it("cachePromiseInterval", (done) => {
  (async function () {
    try {
      const t = cache(`cp1`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["one"],
          create: () =>
            new Promise((res, rej) => {
              mem += 1;

              const locm = mem + 0;

              setTimeout(() => {
                if (locm === 2) {
                  rej(`error: ${locm}`);
                } else {
                  res(`data: ${locm}`);
                }
              }, 10);
            }),
          refreshinterval: 30,
        });
      };

      const one = await call();

      expect(one.data).toEqual("data: 1");

      // await delay(50);

      const two = await call();
      //
      expect(two.data).toEqual("data: 1");
      //
      expect(mem).toEqual(1);
      //
      // await delay(50);
      //
      // const three = await call();
      //
      // log.dump({
      //     three,
      // })
      //
      // // expect(v).toEqual(2000);

      done();
    } catch (e) {
      expect(String(e)).toEqual(`this test shouldn't crush`);

      done(`this test shouldn't crush`);
    }
  })();
});

it("cachePromiseInterval 2", (done) => {
  (async function () {
    try {
      const t = cache(`cp2`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          create: () =>
            new Promise((res, rej) => {
              mem += 1;

              const locm = mem + 0;

              setTimeout(() => {
                if (locm === 2) {
                  rej(`error: ${locm}`);
                } else {
                  res(`data: ${locm}`);
                }
              }, 5);
            }),
          refreshinterval: 30,
        });
      };

      const one = await call();

      expect(one.data).toEqual("data: 1");

      await delay(90);

      const two = await call();
      //
      expect(two.data).toEqual("data: 3");
      //
      expect(mem).toEqual(3);
      //
      // await delay(50);
      //
      // const three = await call();
      //
      // log.dump({
      //     three,
      // })
      //
      // // expect(v).toEqual(2000);

      done();
    } catch (e) {
      expect(String(e)).toEqual(`this test shouldn't crush`);

      done(`this test shouldn't crush`);
    }
  })();
});

it("cachePromiseInterval 3", (done) => {
  (async function () {
    try {
      const t = cache(`cp3`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          create: () =>
            new Promise((res, rej) => {
              mem += 1;

              const locm = mem + 0;

              setTimeout(() => {
                if (locm === 2) {
                  rej(`error: ${locm}`);
                } else {
                  res(`data: ${locm}`);
                }
              }, 5);
            }),
          refreshinterval: 30,
        });
      };

      const one = await call();

      expect(one.data).toEqual("data: 1");

      await delay(90);

      const two = await call();
      //
      expect(two.data).toEqual("data: 3");
      //
      expect(mem).toEqual(3);
      //
      // await delay(50);
      //
      // const three = await call();
      //
      // log.dump({
      //     three,
      // })
      //
      // // expect(v).toEqual(2000);

      done();
    } catch (e) {
      expect(String(e)).toEqual(`this test shouldn't crush`);

      done(`this test shouldn't crush`);
    }
  })();
});

it("cachePromiseInterval crash", (done) => {
  (async function () {
    try {
      let called = 0;

      const t = cache(`cp4`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          create: () =>
            new Promise((res, rej) => {
              called += 1;

              mem += 1;

              const locm = mem + 0;

              setTimeout(() => {
                // if (locm === 2) {

                rej(`error: ${locm}`);
                // }
                // else {
                //
                //     res(`data: ${locm}`)
                // }
              }, 5);
            }),
          refreshinterval: 30,
        });
      };

      const one = await call();

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual("<<2>>:error: 1");

      done();
    }
  })();
});

it("cachePromiseInterval crash 2", (done) => {
  (async function () {
    try {
      let called = 0;

      const t = cache(`cp5`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          create: () => "ok",
          refreshinterval: false,
        });
      };

      const one = await call();

      expect(one.data).toEqual("ok");

      done();
    } catch (e) {
      expect(String(e)).toEqual("<<2>>:error: 1");

      done(`this test shouldn't crush`);
    }
  })();
});

it("cachePromiseInterval crash 22", (done) => {
  (async function () {
    try {
      let called = 0;

      const t = cache(`cp55`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          create: () => {
            throw new Error("exception");
          },
          refreshinterval: false,
        });
      };

      const one = await call();

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual("<<1>>:Error: exception");

      done();
    }
  })();
});

it("cachePromiseInterval crash 3", (done) => {
  (async function () {
    try {
      let called = 0;

      const t = cache(`cp6`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          create: () => "wrong",
          refreshinterval: -90,
        });
      };

      const one = await call();

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual(
        "<<1>>:Error: cachePromiseInterval error: o.refreshinterval is number but it is < than 10, it is '-90'"
      );

      done();
    }
  })();
});

it("cachePromiseInterval crash 4", (done) => {
  (async function () {
    try {
      let called = 0;

      const t = cache(`cp7`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          create: () => "wrong",
          refreshinterval: null,
        });
      };

      const one = await call();

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual(
        "<<1>>:Error: cachePromiseInterval error: o.refreshinterval is not false nor number"
      );

      done();
    }
  })();
});

it("cachePromiseInterval crash 5", (done) => {
  (async function () {
    try {
      let called = 0;

      const t = cache(`cp8`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: {},
          create: () => "wrong",
          refreshinterval: null,
        });
      };

      const one = await call();

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual(
        "<<1>>:Error: cachePromiseInterval error: o.args is not an array"
      );

      done();
    }
  })();
});

it("cachePromiseInterval firstcrach false", (done) => {
  (async function () {
    try {
      let called = 0;

      const t = cache(`cp9`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          firstcrach: false,
          create: () =>
            new Promise((res, rej) => {
              called += 1;

              mem += 1;

              const locm = mem + 0;

              setTimeout(() => {
                // if (locm === 2) {

                rej(`error: ${locm}`);
                // }
                // else {
                //
                //     res(`data: ${locm}`)
                // }
              }, 5);
            }),
          refreshinterval: 30,
        });
      };

      const one = await call();

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual("error: 1");

      done();
    }
  })();
});

it("cachePromiseInterval firstcrach not false", (done) => {
  (async function () {
    try {
      let called = 0;

      const t = cache(`cp10`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          firstcrach: 45,
          create: () =>
            new Promise((res, rej) => {
              called += 1;

              mem += 1;

              const locm = mem + 0;

              setTimeout(() => {
                // if (locm === 2) {

                rej(`error: ${locm}`);
                // }
                // else {
                //
                //     res(`data: ${locm}`)
                // }
              }, 5);
            }),
          refreshinterval: 30,
        });
      };

      const one = await call();

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual(
        "<<1>>:Error: cachePromiseInterval error: o.firstcrach is not boolean"
      );

      done();
    }
  })();
});

it("cachePromiseInterval create not function", (done) => {
  (async function () {
    try {
      let called = 0;

      const t = cache(`cp11`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["two"],
          refreshinterval: 30,
        });
      };

      const one = await call();

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual(
        "<<1>>:Error: cachePromiseInterval error: o.create is not a function"
      );

      done();
    }
  })();
});

it("cachePromiseInterval key not string", (done) => {
  (async function () {
    try {
      const t = cache(4);

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual(
        "Error: cachePromiseInterval error: key is not a string"
      );

      done();
    }
  })();
});

it("cachePromiseInterval key an empty string", (done) => {
  (async function () {
    try {
      const t = cache(" ");

      done(`this test shouldn't crush`);
    } catch (e) {
      expect(String(e)).toEqual(
        "Error: cachePromiseInterval error: key is an empty string"
      );

      done();
    }
  })();
});

it("cachePromiseInterval all good", (done) => {
  (async function () {
    try {
      const t = cache(`cpallgood`);

      let mem = 0;

      const call = async function () {
        return await t({
          test: true,
          args: ["one"],
          create: () =>
            new Promise((res) => {
              mem += 1;

              const locm = mem + 0;

              setTimeout(res, 20, `data: ${locm}`);
            }),
          refreshinterval: 20,
        });
      };

      const one = await call();

      expect(one.data).toEqual("data: 1");

      await delay(70);

      const two = await call();

      expect(two.data).toEqual("data: 3");

      expect(mem).toEqual(3);

      done();
    } catch (e) {
      // log.dump({
      //     error___: e,
      //     n: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
      // })

      done(`this test shouldn't crush..`);
    }
  })();
});

it("cachePromiseInterval all good 3", (done) => {
  (async function () {
    try {
      let called = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
      };

      const t = cache(`cpallgood2`);

      let mem = 0;

      const one = await t({
        test: true,
        args: ["one"],
        create: () =>
          new Promise((res) => {
            called.a += 1;

            mem += 1;

            const locm = mem + 0;

            setTimeout(res, 20, `data: ${locm}`);
          }),
        refreshinterval: 20,
      });

      await t({
        test: true,
        args: ["onetwo"],
        create: () =>
          new Promise((res) => {
            called.b += 1;

            mem += 1;

            const locm = mem + 0;

            setTimeout(res, 20, `data: ${locm}`);
          }),
        refreshinterval: 20,
      });

      expect(one.data).toEqual("data: 1");

      await delay(70);

      await t({
        test: true,
        args: ["one"],
        create: () =>
          new Promise((res) => {
            called.c += 1;

            mem += 1;

            const locm = mem + 0;

            setTimeout(res, 20, `data: ${locm}`);
          }),
        refreshinterval: 20,
      });

      const two = await t({
        test: true,
        args: ["one"],
        create: () =>
          new Promise((res) => {
            called.d += 1;

            mem += 1;

            const locm = mem + 0;

            setTimeout(res, 20, `data: ${locm}`);
          }),
        refreshinterval: 20,
      });

      expect(two.data).toEqual("data: 5");

      expect(called.a).toEqual(4);

      expect(called.b).toEqual(3);

      expect(called.c).toEqual(0);

      expect(called.d).toEqual(0);

      done();
    } catch (e) {
      // log.dump({
      //     error___: e,
      //     n: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
      // })

      done(`this test shouldn't crush>`);
    }
  })();
});

it("cachePromiseInterval time", (done) => {
  (async function () {
    try {
      const t = cache(`cpalltime`);

      await t({
        test: true,
        args: ["one"],
        create: () =>
          new Promise((res) => {
            setTimeout(res, 10, `data...`);
          }),
        refreshinterval: 40,
      });

      await delay(5);

      const one = await t({
        test: true,
        args: ["one"],
        create: () =>
          new Promise((res) => {
            setTimeout(res, 10, `data...`);
          }),
        refreshinterval: 40,
      });

      expect(one.data).toEqual("data...");

      expect(/^2\d{1}ms$/.test(one.leftHuman)).toBeTruthy();

      done();
    } catch (e) {
      // log.dump({
      //     error___: e,
      //     n: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
      // })

      done(`this test shouldn't crush>`);
    }
  })();
});
