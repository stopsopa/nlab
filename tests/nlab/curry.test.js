const curry = require("../../curry");

it("curry 2, 4, 8", (done) => {
  const fn = curry((a, b, c) => a + b + c);

  expect(fn(2)(4)(8)).toEqual(14);

  done();
});

it("curry 2 4, 8", (done) => {
  const fn = curry((a, b, c) => a + b + c);

  expect(fn(2, 4)(8)).toEqual(14);

  done();
});

it("curry 2, 4 8", (done) => {
  const fn = curry((a, b, c) => a + b + c);

  expect(fn(2)(4, 8)).toEqual(14);

  done();
});

it("curry 2 4 8", (done) => {
  const fn = curry((a, b, c) => a + b + c);

  expect(fn(2, 4, 8)).toEqual(14);

  done();
});

it("curry not a fn", (done) => {
  try {
    curry();

    done(`should't succeed`);
  } catch (e) {
    done();
  }
});
