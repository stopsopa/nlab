"use strict";

const get = require("../../get");

const del = require("../../del");

const data = {
  test: {
    one: [
      {
        two: "three",
      },
      {
        four: "five",
      },
      {
        two: {
          a: "b",
          c: "d",
        },
      },
      {
        six: "seven",
      },
    ],
    empty: false,
  },
};

it("del() - just element from object", (done) => {
  const cp = JSON.parse(JSON.stringify(data));

  expect(cp).toEqual(data);

  del(cp, `test.one`);

  expect(cp).toEqual({
    test: {
      empty: false,
    },
  });

  done();
});

it("get() - element from array", (done) => {
  const cp = JSON.parse(JSON.stringify(data));

  expect(cp).toEqual(data);

  del(cp, `test.one.1`);

  expect(cp).toEqual({
    test: {
      one: [
        {
          two: "three",
        },
        {
          two: {
            a: "b",
            c: "d",
          },
        },
        {
          six: "seven",
        },
      ],
      empty: false,
    },
  });

  done();
});

it("get() - through array and further to the object", (done) => {
  const cp = JSON.parse(JSON.stringify(data));

  expect(cp).toEqual(data);

  del(cp, `test.one.2.two.c`);

  expect(cp).toEqual({
    test: {
      one: [
        {
          two: "three",
        },
        {
          four: "five",
        },
        {
          two: {
            a: "b",
          },
        },
        {
          six: "seven",
        },
      ],
      empty: false,
    },
  });

  done();
});

it("get() - non existing key", (done) => {
  const cp = JSON.parse(JSON.stringify(data));

  expect(cp).toEqual(data);

  del(cp, `test.one.2.two.c.dj.k.h`);

  expect(cp).toEqual({
    test: {
      one: [
        {
          two: "three",
        },
        {
          four: "five",
        },
        {
          two: {
            a: "b",
            c: "d",
          },
        },
        {
          six: "seven",
        },
      ],
      empty: false,
    },
  });

  done();
});

it("get() - key is not a string", (done) => {
  const cp = JSON.parse(JSON.stringify(data));

  expect(cp).toEqual(data);

  try {
    del(cp, true);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: nlab/del error: key is not a string nor array"
    );

    done();
  }
});

it("get() - key is string with no dot", (done) => {
  const cp = JSON.parse(JSON.stringify(data));

  expect(cp).toEqual(data);

  del(cp, `test`);

  expect(cp).toEqual({});

  done();
});

it("get() - key as array - not string", (done) => {
  const cp = JSON.parse(JSON.stringify(data));

  expect(cp).toEqual(data);

  try {
    del(cp, ["test", "one", true]);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: nlab/del error: one of the keys in the array is not a string"
    );

    done();
  }
});
