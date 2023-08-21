const promiseall = require("../../promiseall");

const delay = require("../../delay");

try {
jest.setTimeout(20000);
} catch (e) {}
// jest.setTimeout(500);

it("promiseall no args", (done) => {
  (async function () {
    try {
      await promiseall();
    } catch (e) {
      expect(String(e)).toEqual("Error: promiseall error: list is not an array");

      done();
    }
  })();
});

it("promiseall wrong arg", (done) => {
  (async function () {
    try {
      await promiseall(true);
    } catch (e) {
      expect(String(e)).toEqual("Error: promiseall error: list is not an array");

      done();
    }
  })();
});

it("promiseall empty array", (done) => {
  (async function () {
    const data = await promiseall([]);

    expect(data).toEqual([]);

    done();
  })();
});

it("promiseall one is not a promise", (done) => {
  (async function () {
    try {
      await promiseall([Promise.resolve("abc"), () => {}, Promise.reject("zdd")]);
    } catch (e) {
      expect(String(e)).toEqual("Error: promiseall error: list[1] is not a promise");

      done();
    }
  })();
});

it("promiseall one is not a promise 2", (done) => {
  (async function () {
    try {
      await promiseall([() => {}]);
    } catch (e) {
      expect(String(e)).toEqual("Error: promiseall error: list[0] is not a promise");

      done();
    }
  })();
});

it("promiseall 3 resolved", (done) => {
  (async function () {
    const data = await promiseall([Promise.resolve("abc"), Promise.resolve("cde"), Promise.resolve("efg")]);

    expect(data).toEqual(["abc", "cde", "efg"]);

    done();
  })();
});

it("promiseall 3 resolved ver 2", (done) => {
  (async function () {
    const data = await promiseall([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("abc"), 50);
      }),
      Promise.resolve("cde"),
      Promise.resolve("efg"),
    ]);

    expect(data).toEqual(["abc", "cde", "efg"]);

    done();
  })();
});

it("promiseall 3 resolved ver 3", (done) => {
  (async function () {
    const data = await promiseall([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("abc"), 150);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("cde"), 50);
      }),
      Promise.resolve("efg"),
    ]);

    expect(data).toEqual(["abc", "cde", "efg"]);

    done();
  })();
});

it("promiseall 3 resolved ver 4", (done) => {
  (async function () {
    const data = await promiseall([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("abc"), 150);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("cde"), 50);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("ddd"), 20);
      }),
      Promise.resolve("efg"),
    ]);

    expect(data).toEqual(["abc", "cde", "ddd", "efg"]);

    done();
  })();
});

it("promiseall 3 resolved ver 5", (done) => {
  (async function () {
    const data = await promiseall([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("abc"), 150);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("cde"), 50);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("ddd"), 20);
      }),
    ]);

    expect(data).toEqual(["abc", "cde", "ddd"]);

    done();
  })();
});

it("promiseall 3 resolved ver 6", (done) => {
  (async function () {
    const data = await promiseall([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("abc"), 150);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("cde"), 10);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("ddd"), 50);
      }),
    ]);

    expect(data).toEqual(["abc", "cde", "ddd"]);

    done();
  })();
});

it("promiseall 3 reject 1", (done) => {
  (async function () {
    try {
      await promiseall([
        new Promise((resolve, reject) => {
          setTimeout(() => resolve("abc"), 150);
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => reject("cde"), 10);
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => resolve("ddd"), 50);
        }),
      ]);
    } catch (e) {
      expect(e).toEqual([
        {
          resolved: true,
          data: "abc",
        },
        {
          resolved: false,
          data: "cde",
        },
        {
          resolved: true,
          data: "ddd",
        },
      ]);

      done();
    }
  })();
});

it("promiseall 3 reject 2", (done) => {
  (async function () {
    try {
      await promiseall([
        new Promise((resolve, reject) => {
          setTimeout(() => resolve("abc"), 150);
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => reject("cde"), 10);
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => reject("ddd"), 50);
        }),
      ]);
    } catch (e) {
      expect(e).toEqual([
        {
          resolved: true,
          data: "abc",
        },
        {
          resolved: false,
          data: "cde",
        },
        {
          resolved: false,
          data: "ddd",
        },
      ]);

      done();
    }
  })();
});

it("promiseall 3 reject 3", (done) => {
  (async function () {
    try {
      await promiseall([
        new Promise((resolve, reject) => {
          setTimeout(() => reject("abc"), 150);
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => reject("cde"), 10);
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => reject("ddd"), 50);
        }),
      ]);
    } catch (e) {
      expect(e).toEqual([
        {
          resolved: false,
          data: "abc",
        },
        {
          resolved: false,
          data: "cde",
        },
        {
          resolved: false,
          data: "ddd",
        },
      ]);

      done();
    }
  })();
});

it("promiseall 3 reject by throw", (done) => {
  (async function () {
    try {
      await promiseall([
        new Promise((resolve, reject) => {
          setTimeout(() => reject("abc"), 150);
        }),
        new Promise((resolve, reject) => {
          throw "throw...";
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => reject("ddd"), 50);
        }),
      ]);
    } catch (e) {
      expect(e).toEqual([
        {
          resolved: false,
          data: "abc",
        },
        {
          resolved: false,
          data: "throw...",
        },
        {
          resolved: false,
          data: "ddd",
        },
      ]);

      done();
    }
  })();
});

it("promiseall 3 reject by throw both", (done) => {
  (async function () {
    try {
      await promiseall([
        new Promise((resolve, reject) => {
          throw "throw 1";
        }),
        new Promise((resolve, reject) => {
          throw "throw 2";
        }),
      ]);
    } catch (e) {
      expect(e).toEqual([
        {
          resolved: false,
          data: "throw 1",
        },
        {
          resolved: false,
          data: "throw 2",
        },
      ]);

      done();
    }
  })();
});

it("promiseall async", (done) => {
  (async function () {
    const data = await promiseall([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("abc"), 150);
      }),
      async () => "cde",
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("ddd"), 50);
      }),
    ]);

    expect(data).toEqual(["abc", "cde", "ddd"]);

    done();
  })();
});

it("promiseall async 2", (done) => {
  (async function () {
    const data = await promiseall([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("abc"), 150);
      }),
      async () => {
        await delay(30);

        return "cde";
      },
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("ddd"), 50);
      }),
    ]);

    expect(data).toEqual(["abc", "cde", "ddd"]);

    done();
  })();
});

it("promiseall async 33", (done) => {
  (async function () {
    try {
      await promiseall([
        new Promise((resolve, reject) => {
          setTimeout(() => resolve("abc"), 150);
        }),
        async () => {
          throw "def";
        },
        new Promise((resolve, reject) => {
          setTimeout(() => resolve("ddd"), 50);
        }),
      ]);
    } catch (e) {
      expect(e).toEqual([
        {
          resolved: true,
          data: "abc",
        },
        {
          resolved: false,
          data: "def",
        },
        {
          resolved: true,
          data: "ddd",
        },
      ]);

      done();
    }
  })();
});

it("promiseall async 3", (done) => {
  (async function () {
    try {
      await promiseall([
        async () => {
          await delay(30);

          throw "abc";
        },
        async () => {
          await delay(50);

          throw "def";
        },
        async () => {
          throw "ddd";
        },
      ]);
    } catch (e) {
      expect(e).toEqual([
        {
          resolved: false,
          data: "abc",
        },
        {
          resolved: false,
          data: "def",
        },
        {
          resolved: false,
          data: "ddd",
        },
      ]);

      done();
    }

    (async function () {})();
  })();
});
