"use strict";

const trim = require("../../trim");

const pregQuote = require("../../pregQuote");

it(`trim('')`, () => {
  expect(trim("")).toBe("");
});

it(`trim('a')`, () => {
  expect(trim("a ")).toBe("a");
});

it(`trim('a ')`, () => {
  expect(trim("a ")).toBe("a");
});

it(`trim('a  ')`, () => {
  expect(trim("a  ")).toBe("a");
});

it(`trim(' b')`, () => {
  expect(trim(" b")).toBe("b");
});

it(`trim('  b')`, () => {
  expect(trim("  b")).toBe("b");
});

it(`trim(' c ')`, () => {
  expect(trim(" c ")).toBe("c");
});

it(`trim('  c  ')`, () => {
  expect(trim("  c  ")).toBe("c");
});

it(`trim('  abc  ')`, () => {
  expect(trim("  abc  ")).toBe("abc");
});

it(`trim('  abc  ')`, () => {
  expect(trim("  abc  ")).toBe("abc");
});

it(`trim(4)`, () => {
  expect(trim(4)).toBeFalsy();
});

".?*+^$[\\]\\\\(){}|-mnoprs".split("").forEach((i) => {
  it(`trim('${i}abc${i}', '${i}')`, () => {
    expect(trim(`${i}abc${i}`, i)).toEqual("abc");
  });
});

".?*+^$[\\]\\\\(){}|-mnoprs".split("").forEach((i) => {
  it(`trim('${i}${i}abc${i}${i}', '${i}')`, () => {
    expect(trim(`${i}${i}abc${i}${i}`, i)).toEqual("abc");
  });
});

".?*+^$[\\]\\\\(){}|-".split("").forEach((i) => {
  it(`trim('${i}abc${i}', '${i}')`, () => {
    expect(trim(`${i}abc${i}`, i)).toEqual("abc");
  });
});

".?*+^$[\\]\\\\(){}|-.?*+^$[\\]\\\\(){}|-mnoprs".match(/.{1,2}/g).forEach((i) => {
  it(`trim('${i}abc${i}', '${i}')`, () => {
    expect(trim(`${i}abc${i}`, i)).toEqual("abc");
  });
});

".?*+^$[\\]\\\\(){}|-.?*+^$[\\]\\\\(){}|-mnoprs".match(/.{1,2}/g).forEach((i) => {
  it(`trim('${i}${i}abc${i}${i}', '${i}')`, () => {
    expect(trim(`${i}${i}abc${i}${i}`, i)).toEqual("abc");
  });
});

".?*+^$[\\]\\\\(){}|-mnoprs".split("").forEach((i) => {
  it(`trim('${i}${i}abc${i}${i}', '${i}', 'r')`, () => {
    expect(trim(`${i}${i}abc${i}${i}`, i, "r")).toEqual(`${i}${i}abc`);
  });
});

".?*+^$[\\]\\\\(){}|-mnoprs".split("").forEach((i) => {
  it(`trim('${i}abc${i}', '${i}', 'r')`, () => {
    expect(trim(`${i}abc${i}`, i, "r")).toEqual(`${i}abc`);
  });
});

".?*+^$[\\]\\\\(){}|-.?*+^$[\\]\\\\(){}|-mnoprs".match(/.{1,2}/g).forEach((i) => {
  it(`trim('${i}abc${i}', '${i}', 'r')`, () => {
    expect(trim(`${i}abc${i}`, i, "r")).toEqual(`${i}abc`);
  });
});

".?*+^$[\\]\\\\(){}|-.?*+^$[\\]\\\\(){}|-mnoprs".match(/.{1,2}/g).forEach((i) => {
  it(`trim('${i}${i}abc${i}${i}', '${i}', 'r')`, () => {
    expect(trim(`${i}${i}abc${i}${i}`, i, "r")).toEqual(`${i}${i}abc`);
  });
});

".?*+^$[\\]\\\\(){}|-mnoprs".split("").forEach((i) => {
  it(`trim('${i}${i}abc${i}${i}', '${i}', 'l')`, () => {
    expect(trim(`${i}${i}abc${i}${i}`, i, "l")).toEqual(`abc${i}${i}`);
  });
});

".?*+^$[\\]\\\\(){}|-mnoprs".split("").forEach((i) => {
  it(`trim('${i}abc${i}', '${i}', 'l')`, () => {
    expect(trim(`${i}abc${i}`, i, "l")).toEqual(`abc${i}`);
  });
});

".?*+^$[\\]\\\\(){}|-.?*+^$[\\]\\\\(){}|-mnoprs".match(/.{1,2}/g).forEach((i) => {
  it(`trim('${i}abc${i}', '${i}', 'l')`, () => {
    expect(trim(`${i}abc${i}`, i, "l")).toEqual(`abc${i}`);
  });
});

".?*+^$[\\]\\\\(){}|-.?*+^$[\\]\\\\(){}|-mnoprs".match(/.{1,2}/g).forEach((i) => {
  it(`trim('${i}${i}abc${i}${i}', '${i}', 'l')`, () => {
    expect(trim(`${i}${i}abc${i}${i}`, i, "l")).toEqual(`abc${i}${i}`);
  });
});

it(`pregQuote`, (done) => {
  expect(pregQuote()).toBeFalsy();

  done();
});

it(`trim()`, () => {
  let t = "bd1bf8c_2020-10-26_09-54-20-";

  t = trim(t, "_- ");

  expect(t).toEqual("bd1bf8c_2020-10-26_09-54-20");
});
