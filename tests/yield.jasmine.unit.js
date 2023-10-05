function normalize(str) {
  return str
    .split("\n") // split string to separate lines
    .map((s) => s.trim()) // trim those lines
    .filter(Boolean) // drop empty lines
    .join("\n"); // and combine it back with \n delimiter
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
 */

it("yield", (done) => {
  function* foo(index) {
    while (index < 2) {
      yield index;
      index++;
    }
  }

  const iterator = foo(0);
  expect(iterator.next()).toEqual({ done: false, value: 0 });
  expect(iterator.next()).toEqual({ done: false, value: 1 });
  expect(iterator.next()).toEqual({ done: true, value: undefined });

  done();
});

it("yield 1", (done) => {
  function* foo() {
    for (var i = 0; i < 3; i += 1) {
      yield `ret-${i}`;
    }

    yield `end`;
  }

  const iterator = foo();

  expect(iterator.next()).toEqual({ done: false, value: `ret-0` });
  expect(iterator.next()).toEqual({ done: false, value: `ret-1` });
  expect(iterator.next()).toEqual({ done: false, value: `ret-2` });
  expect(iterator.next()).toEqual({ done: false, value: `end` });
  expect(iterator.next()).toEqual({ done: true, value: undefined });

  done();
});

it("yield lifecycle", (done) => {
  let tmp = "";

  const log = (...args) => {
    tmp += "\n" + JSON.stringify(args);
  };

  function* foo() {
    for (var i = 0; i < 3; i += 1) {
      log(`i: ${i}`);

      yield `ret-${i}`;
    }

    log(`end...`);

    yield `end`;
  }

  const iterator = foo();

  log("print1: ", iterator.next());
  log("print2: ", iterator.next());
  log("print3: ", iterator.next());
  log("print4: ", iterator.next());
  log("print5: ", iterator.next());
  log("print6: ", iterator.next());

  expect(normalize(tmp)).toEqual(
    normalize(
      `
    
    ["i: 0"]
    ["print1: ",{"value":"ret-0","done":false}]
    ["i: 1"]
    ["print2: ",{"value":"ret-1","done":false}]
    ["i: 2"]
    ["print3: ",{"value":"ret-2","done":false}]
    ["end..."]
    ["print4: ",{"value":"end","done":false}]
    ["print5: ",{"done":true}]
    ["print6: ",{"done":true}]
    
`,
    ),
  );

  done();
});

/**
 * Warning: Unfortunately, next() is asymmetric, but that can't be helped: It always sends a value to the currently suspended yield, but returns the operand of the following yield.
 */
it("yield retrieves the optional value - more", (done) => {
  let tmp = "";

  const log = (...args) => {
    tmp += "\n" + JSON.stringify(args);
  };

  function* foo() {
    let tmp;

    for (var i = 0; i < 3; i += 1) {
      log(`i: ${i}`, tmp);

      tmp = yield `ret-${i}-${tmp}`;
    }

    log(`end...`, tmp);

    yield `end`;
  }

  const iterator = foo(0);

  log("print1: ", iterator.next("one"));
  log("print2: ", iterator.next("two"));
  log("print3: ", iterator.next("three"));
  log("print4: ", iterator.next("four"));
  log("print5: ", iterator.next("six"));
  log("print6: ", iterator.next());

  expect(normalize(tmp)).toEqual(
    normalize(
      `
    
    ["i: 0",null]
    ["print1: ",{"value":"ret-0-undefined","done":false}]
    ["i: 1","two"]
    ["print2: ",{"value":"ret-1-two","done":false}]
    ["i: 2","three"]
    ["print3: ",{"value":"ret-2-three","done":false}]
    ["end...","four"]
    ["print4: ",{"value":"end","done":false}]
    ["print5: ",{"done":true}]
    ["print6: ",{"done":true}]
    
`,
    ),
  );

  done();
});

it("yield retrieves the optional value - less", (done) => {
  let tmp = "";

  const log = (...args) => {
    tmp += "\n" + JSON.stringify(args);
  };

  function* foo() {
    let tmp;

    for (var i = 0; i < 3; i += 1) {
      log(`i: ${i}`, tmp);

      tmp = yield `ret-${i}-${tmp}`;
    }

    log(`end...`, tmp);

    yield `end`;
  }

  const iterator = foo();

  log("print1: ", iterator.next("one"));
  log("print2: ", iterator.next("two"));
  log("print3: ", iterator.next());
  log("print4: ", iterator.next());
  log("print5: ", iterator.next());
  log("print6: ", iterator.next());

  expect(normalize(tmp)).toEqual(
    normalize(
      `
    
    ["i: 0",null]
    ["print1: ",{"value":"ret-0-undefined","done":false}]
    ["i: 1","two"]
    ["print2: ",{"value":"ret-1-two","done":false}]
    ["i: 2",null]
    ["print3: ",{"value":"ret-2-undefined","done":false}]
    ["end...",null]
    ["print4: ",{"value":"end","done":false}]
    ["print5: ",{"done":true}]
    ["print6: ",{"done":true}]
    
`,
    ),
  );

  done();
});

it("yield return", (done) => {
  let tmp = "";

  const log = (...args) => {
    tmp += "\n" + JSON.stringify(args);
  };

  function* foo() {
    const a = yield "one";

    log(`a:${a}`);

    const b = yield `two-${a}`;

    log(`b:${b}`);

    return `end-${b}`;
  }

  let iterator = foo();

  log("print1: ", iterator.next("x"));
  log("print2: ", iterator.next("y"));
  log("print3: ", iterator.next("z"));
  log("print4: ", iterator.next(`w`));

  expect(normalize(tmp)).toEqual(
    normalize(
      `
    
    ["print1: ",{"value":"one","done":false}]
    ["a:y"]
    ["print2: ",{"value":"two-y","done":false}]
    ["b:z"]
    ["print3: ",{"value":"end-z","done":true}]
    ["print4: ",{"done":true}]
    
`,
    ),
  );

  done();
});

it("yield throw", (done) => {
  let tmp = "";

  const log = (...args) => {
    tmp += "\n" + JSON.stringify(args);
  };

  function* foo() {
    const a = yield "one";

    log(`a:${a}`);

    const b = yield `two-${a}`;

    throw new Error(`message...`);
  }

  let iterator = foo();

  try {
    log("print1: ", iterator.next("x"));
    log("print2: ", iterator.next("y"));
    log("print3: ", iterator.next("z"));
    log("print4: ", iterator.next(`w`));

    done(`shouldn't reach this point`);
  } catch (e) {
    log("error", String(e));

    expect(normalize(tmp)).toEqual(
      normalize(
        `
    
    ["print1: ",{"value":"one","done":false}]
    ["a:y"]
    ["print2: ",{"value":"two-y","done":false}]
    ["error","Error: message..."]
    
`,
      ),
    );

    done();
  }
});

it("yield empty generater", (done) => {
  let tmp = "";

  const log = (...args) => {
    tmp += "\n" + JSON.stringify(args);
  };

  function* foo() {}

  let iterator = foo();

  log("print1: ", iterator.next("x"));
  log("print2: ", iterator.next("y"));
  log("print3: ", iterator.next("z"));
  log("print4: ", iterator.next(`w`));

  expect(normalize(tmp)).toEqual(
    normalize(
      `
    
  ["print1: ",{"done":true}]
  ["print2: ",{"done":true}]
  ["print3: ",{"done":true}]
  ["print4: ",{"done":true}]
    
`,
    ),
  );

  done();
});
