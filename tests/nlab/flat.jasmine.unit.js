const flat = require("nlab/flat.js");

it("flat() - including arrays", (done) => {
  const data = flat({
    a: "b",
    e: {
      z: {
        test: "end",
      },
    },
    c: "d",
    dd: ["one", "two", "three"],
  });

  expect(data).toEqual({
    a: "b",
    "e.z.test": "end",
    c: "d",
    "dd.0": "one",
    "dd.1": "two",
    "dd.2": "three",
  });

  done();
});

it("flat() - excluding arrays", (done) => {
  const data = flat(
    {
      a: "b",
      e: {
        z: {
          test: "end",
        },
      },
      c: "d",
      dd: ["one", "two", "three"],
    },
    true,
  );

  expect(data).toEqual({
    a: "b",
    "e.z.test": "end",
    c: "d",
    dd: ["one", "two", "three"],
  });

  done();
});

it("flat() - deep", (done) => {
  const data = flat({
    a: "b",
    e: {
      z: {
        test: {
          deep: {
            deeper: {
              of: {
                course: {
                  val: [1, 4],
                },
              },
            },
          },
        },
      },
    },
    c: "d",
    dd: ["one", "two", "three"],
  });

  expect(data).toEqual({
    a: "b",
    "e.z.test.deep.deeper.of.course.val.0": 1,
    "e.z.test.deep.deeper.of.course.val.1": 4,
    c: "d",
    "dd.0": "one",
    "dd.1": "two",
    "dd.2": "three",
  });

  done();
});

it("flat() - skipArray", (done) => {
  const data = flat(
    {
      a: "b",
      e: {
        z: {
          test: {
            deep: {
              deeper: {
                of: {
                  course: {
                    val: [1, 4],
                  },
                },
              },
            },
          },
        },
      },
      c: "d",
      dd: ["one", "two", "three"],
    },
    true,
  );

  expect(data).toEqual({
    a: "b",
    "e.z.test.deep.deeper.of.course.val.0": 1,
    "e.z.test.deep.deeper.of.course.val.1": 4,
    c: "d",
    dd: ["one", "two", "three"],
  });

  done();
});

it("flat() - string", (done) => {
  const data = flat("test");

  expect(data).toEqual({});

  done();
});

it("flat() - array", (done) => {
  const data = flat(["a", "b"]);

  expect(data).toEqual({
    0: "a",
    1: "b",
  });

  done();
});

it("flat() - array skipArray", (done) => {
  const data = flat(["a", "b"], true);

  expect(data).toEqual(["a", "b"]);

  done();
});
