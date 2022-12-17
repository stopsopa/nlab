"use strict";

const ms = require("../../ms");

const generate = ms.generate;

const raw = ms.raw;

const log = require("inspc");

const trim = require("../../trim");

function f(o) {
  o = JSON.stringify(o);

  o = o.replace(/[",\{\}]/g, " ");

  o = o.replace(/\s\s+/g, " ");

  o = o.replace(/([a-z]) :(\d+)/g, "$1:$2");

  return trim(o);
}

function discard(o) {
  return Object.keys(o).reduce((acc, key) => {
    if (o[key]) {
      acc[key] = o[key];
    }

    return acc;
  }, {});
}

it("ms.generate 1", (done) => {
  try {
    const v = generate({
      ms: 2000,
    });

    expect(v).toEqual(2000);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 2000ms 5s", (done) => {
  try {
    const v = generate({
      ms: 2000,
      s: 5,
    });

    expect(v).toEqual(7000);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 5s", (done) => {
  try {
    const v = generate({
      ms: 56,
      s: 5,
    });

    expect(v).toEqual(5056);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 5s 4d", (done) => {
  try {
    const v = generate({
      ms: 56,
      d: 4,
      s: 5,
    });

    expect(v).toEqual(345605056);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 5s 0d", (done) => {
  try {
    const v = generate({
      ms: 56,
      d: 0,
      s: 5,
    });

    expect(v).toEqual(5056);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 0s 0d", (done) => {
  try {
    const v = generate({
      ms: 56,
      d: 0,
      s: 0,
    });

    expect(v).toEqual(56);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 0ms 0s 0d", (done) => {
  try {
    const v = generate({
      ms: 0,
      d: 0,
      s: 0,
    });

    expect(v).toEqual(0);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 5s 19h 4d", (done) => {
  try {
    const v = generate({
      ms: 56,
      s: 5,
      h: 19,
      d: 4,
    });

    expect(v).toEqual(345605056 + 68400000);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 5s 19h 4d 6y", (done) => {
  try {
    const v = generate({
      ms: 56,
      s: 5,
      h: 19,
      d: 4,
      y: 6,
    });

    expect(v).toEqual(345605056 + 68400000 + 189216000000);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 5s 19h 4d 0y", (done) => {
  try {
    const v = generate({
      ms: 56,
      s: 5,
      h: 19,
      d: 4,
      y: 0,
    });

    expect(v).toEqual(345605056 + 68400000 + 0);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 5s 19h 4d 0y 7z", (done) => {
  try {
    const v = generate({
      ms: 58,
      s: 5,
      h: 19,
      d: 4,
      y: 0,
      z: 7,
    });

    expect(v).toEqual(345605058 + 68400000 + 0);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 5s 45m 19h 4d 6y", (done) => {
  try {
    const v = generate({
      ms: 56,
      s: 5,
      m: 45,
      h: 19,
      d: 4,
      y: 6,
    });

    expect(v).toEqual(345605056 + 68400000 + 189216000000 + 2700000);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 56ms 5s 145m 19h 4d 6y", (done) => {
  try {
    const v = generate(
      {
        ms: 56,
        s: 5,
        m: 145,
        h: 19,
        d: 4,
        y: 6,
      },
      "ms"
    );

    expect(v).toEqual(56 + 345605000 + 68400000 + 189216000000 + 8700000);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 0ms 0s 0m 0h 0d 0y", (done) => {
  try {
    const v = generate({
      ms: 0,
      s: 0,
      m: 0,
      h: 0,
      d: 0,
      y: 0,
    });

    expect(v).toEqual(0);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 0ms 0s 0m 0h 0d 1y", (done) => {
  try {
    const v = generate({
      ms: 0,
      s: 0,
      m: 0,
      h: 0,
      d: 0,
      y: 1,
      z: 0,
    });

    expect(v).toEqual(1000 * 60 * 60 * 24 * 365);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate wrong unit", (done) => {
  try {
    const v = generate(
      {
        ms: 0,
        s: 0,
        m: 0,
        h: 0,
        d: 0,
        y: 1,
        z: 0,
      },
      "z"
    );

    expect(v).toEqual(1000 * 60 * 60 * 24 * 365);

    done(`this test should crash`);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: nlab/ms library error: generate: unknown unit (z), valid units are: 'ms, s, m, h, d, y'"
    );

    done();
  }
});

it("ms.generate 56ms 60s 145m 19h 4d 6y - m", (done) => {
  try {
    const v = generate(
      {
        ms: 56,
        s: 60, // 1
        m: 145,
        h: 19, // 1140
        d: 4, // 5760
        y: 6, // 3153600
      },
      "m"
    );

    expect(v).toEqual(1 + 145 + 1140 + 5760 + 3153600);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 950400000ms 518400s 4320m 49h 4d 6y - d", (done) => {
  try {
    const v = generate(
      {
        ms: 950400000, // 11
        s: 518400, // 6
        m: 4320, // 3
        h: 49, // 2
        d: 4, // 4
        y: 6, // 2190
      },
      "d"
    );

    expect(v).toEqual(11 + 6 + 3 + 2 + 4 + 2190);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 2d 7y - y", (done) => {
  try {
    const v = generate(
      {
        d: 365 * 2 + 5, // 2
        y: 7,
      },
      "y"
    );

    expect(v).toEqual(2 + 7);

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate 2d 7y - ms", (done) => {
  try {
    const v = generate({
      d: 365 * 2 + 5, // 2
      y: 7,
    });

    expect(v).toEqual(
      1000 * 60 * 60 * 24 * 365 * 2 +
        1000 * 60 * 60 * 24 * 5 +
        1000 * 60 * 60 * 24 * 365 * 7
    );

    expect(v).toEqual(
      generate({ y: 2 }) + generate({ d: 5 }) + generate({ y: 7 })
    );

    done();
  } catch (e) {
    expect(String(e)).toEqual(`this test shouldn't crash`);

    done(`this test shouldn't crash`);
  }
});

it("ms.generate unit y", (done) => {
  try {
    const v = generate(
      {
        ms: 0,
        s: 0,
        m: 0,
        h: 0,
        d: 0,
        y: 1,
        z: 0,
      },
      "y"
    );

    expect(v).toEqual(1);

    done();
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: nlab/ms library error: generate: unknown unit (z), valid units are: 'ms, s, m, h, d, y'"
    );

    done(`this test shouldn't crash`);
  }
});

(function (i) {
  it("raw - " + f(i), (done) => {
    try {
      const h = raw(generate(i));

      expect(discard(h)).toEqual(discard(i));

      done();
    } catch (e) {
      done(`shouldn't throw error: ${e}`);
    }
  });
})({ d: 0, h: 0, m: 0, ms: 60, s: 0, y: 0 });

(function (i) {
  it("raw - " + f(i), (done) => {
    try {
      const h = raw(generate(i));

      expect(discard(h)).toEqual(discard(i));

      done();
    } catch (e) {
      done(`shouldn't throw error: ${e}`);
    }
  });
})({
  ms: 456,
  s: 43,
  m: 54,
  h: 5,
  d: 3,
  y: 9,
});

(function (i) {
  it("raw - " + f(i), (done) => {
    try {
      const h = raw(generate(i));

      expect(discard(h)).toEqual(discard(i));

      done();
    } catch (e) {
      done(`shouldn't throw error: ${e}`);
    }
  });
})({
  ms: 456,
});

(function (i) {
  it("raw - " + f(i), (done) => {
    try {
      const h = raw(generate(i));

      expect(discard(h)).toEqual(discard(i));

      done();
    } catch (e) {
      done(`shouldn't throw error: ${e}`);
    }
  });
})({
  s: 43,
});

(function (i) {
  it("raw - " + f(i), (done) => {
    try {
      const h = raw(generate(i));

      expect(discard(h)).toEqual(discard(i));

      done();
    } catch (e) {
      done(`shouldn't throw error: ${e}`);
    }
  });
})({
  m: 54,
});

(function (i) {
  it("raw - " + f(i), (done) => {
    try {
      const h = raw(generate(i));

      expect(discard(h)).toEqual(discard(i));

      done();
    } catch (e) {
      done(`shouldn't throw error: ${e}`);
    }
  });
})({
  d: 3,
});

(function (i) {
  it("raw - " + f(i), (done) => {
    try {
      const h = raw(generate(i));

      expect(discard(h)).toEqual(discard(i));

      done();
    } catch (e) {
      done(`shouldn't throw error: ${e}`);
    }
  });
})({
  y: 9,
});

(function (i) {
  it("raw - " + f(i), (done) => {
    try {
      const h = raw(generate(i));

      expect(discard(h)).toEqual(discard(i));

      done();
    } catch (e) {
      done(`shouldn't throw error: ${e}`);
    }
  });
})({
  ms: 456,
  s: 43,
  m: 0,
  h: 5,
  d: 3,
  y: 0,
});

(function (i) {
  it("raw - " + f(i), (done) => {
    try {
      const h = raw(generate(i));

      expect(discard(h)).toEqual(
        discard({ d: 4, h: 1, m: 54, ms: 456, s: 43, y: 9 })
      );

      done();
    } catch (e) {
      done(`shouldn't throw error: ${e}`);
    }
  });
})({
  ms: 456,
  s: 43,
  m: 54,
  h: 25,
  d: 3,
  y: 9,
});

it("raw - wrong opt", (done) => {
  try {
    raw(60, "mss");

    done(`should throw error`);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: nlab/ms library error: unit 'mss' is string but it is not on the list: 'ms, s, m, h, d, y'"
    );

    done();
  }
});

it("raw - first arg not a number", (done) => {
  try {
    raw();

    done(`should throw error`);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: nlab/ms library error: time is not a number"
    );

    done();
  }
});

it("ms - time undefined", (done) => {
  try {
    ms(); // test undefined

    done(`should throw error`);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: nlab/ms library error: time is not a number"
    );

    done();
  }
});

it("ms - time string", (done) => {
  try {
    ms(`shouldn't be a string eather`);

    done(`should throw error`);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: nlab/ms library error: time is not a number"
    );

    done();
  }
});

it("ms - 56ms", (done) => {
  try {
    const t = ms(56);

    expect(t).toEqual("56ms");

    done();
  } catch (e) {
    done(`shouldn't throw error: ${e}`);
  }
});

it("ms - wrong unit", (done) => {
  try {
    const t = ms(56, "wrong unit");

    done(`should throw error`);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: nlab/ms library error: unit 'wrong unit' is string but it is not on the list: 'ms, s, m, h, d, y'"
    );

    done();
  }
});

it("ms - 2y 3d 4h 47m 46s 45ms", (done) => {
  try {
    const t = ms(
      generate({
        ms: 45,
        s: 46,
        m: 47,
        h: 4,
        d: 3,
        y: 2,
      })
    );

    expect(t).toEqual("2y 3d 4h 47m 46s 45ms");

    done();
  } catch (e) {
    done(`shouldn't throw error: ${e}`);
  }
});

it("ms - 2y 3d 4h 47m 46s 45ms", (done) => {
  try {
    const t = ms(
      generate({
        ms: 45,
        s: 46,
        m: 47,
        d: 3,
        y: 2,
      })
    );

    expect(t).toEqual("2y 3d 47m 46s 45ms");

    done();
  } catch (e) {
    done(`shouldn't throw error: ${e}`);
  }
});

it("ms - 2y 368d 4h 47m 46s 45ms - day overclock", (done) => {
  try {
    const t = ms(
      generate({
        ms: 45,
        s: 46,
        m: 47,
        d: 368,
        y: 2,
      })
    );

    expect(t).toEqual("3y 3d 47m 46s 45ms");

    done();
  } catch (e) {
    done(`shouldn't throw error: ${e}`);
  }
});

it("ms - 2y 3d 4h 67m 46s 45ms - m overclock", (done) => {
  try {
    const t = ms(
      generate({
        ms: 45,
        s: 46,
        m: 67,
        h: 4,
        d: 3,
        y: 2,
      })
    );

    expect(t).toEqual("2y 3d 5h 7m 46s 45ms");

    done();
  } catch (e) {
    done(`shouldn't throw error: ${e}`);
  }
});

it("ms - 2y 3d 4h 67m 46s 3045ms - ms overclock", (done) => {
  try {
    const t = ms(
      generate({
        ms: 3045,
        s: 46,
        m: 67,
        h: 4,
        d: 3,
        y: 2,
      })
    );

    expect(t).toEqual("2y 3d 5h 7m 49s 45ms");

    done();
  } catch (e) {
    done(`shouldn't throw error: ${e}`);
  }
});

it("ms - 2y 3d 4h 67m 46s 45ms - different base units", (done) => {
  try {
    const t = ms(
      generate(
        {
          ms: 45,
          s: 46,
          m: 67,
          h: 4,
          d: 3,
          y: 2,
        },
        "s"
      ),
      "s"
    );

    expect(t).toEqual("2y 3d 5h 7m 46s");

    done();
  } catch (e) {
    done(`shouldn't throw error: ${e}`);
  }
});

it("ms - change output units", (done) => {
  try {
    const t = ms(
      generate(
        {
          ms: 45,
          s: 46,
          m: 67,
          h: 4,
          d: 3,
          y: 2,
        },
        "s"
      ),
      {
        unit: "s",
        dict: {
          ms: " msx",
          s: " sx",
          m: " mx",
          h: " hx",
          d: " dx",
          y: " yx",
        },
      }
    );

    expect(t).toEqual("2 yx 3 dx 5 hx 7 mx 46 sx");

    done();
  } catch (e) {
    done(`shouldn't throw error: ${e}`);
  }
});
