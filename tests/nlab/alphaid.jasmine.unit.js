const alphaid = require("nlab/alphaid.js");

it("alphaid basic", (done) => {
  try {
    const t = alphaid("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

    expect(t.encode(0)).toEqual("a");
    expect(t.encode(1)).toEqual("b");
    expect(t.encode(2)).toEqual("c");
    expect(t.encode(3)).toEqual("d");
    expect(t.encode(4)).toEqual("e");
    expect(t.encode(5)).toEqual("f");
    expect(t.encode(24)).toEqual("y");
    expect(t.encode(26)).toEqual("A");
    expect(t.encode(40)).toEqual("O");
    expect(t.encode(50)).toEqual("Y");
    expect(t.encode(60)).toEqual("8");
    expect(t.encode(61)).toEqual("9");
    expect(t.encode(62)).toEqual("ba");
    expect(t.encode(63)).toEqual("bb");

    done();
  } catch (e) {
    done(String(e));
  }
});

it("alphaid basic changed", (done) => {
  try {
    const t = alphaid("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0132456789");

    expect(t.encode(0)).toEqual("a");
    expect(t.encode(1)).toEqual("b");
    expect(t.encode(2)).toEqual("c");
    expect(t.encode(3)).toEqual("d");
    expect(t.encode(4)).toEqual("e");
    expect(t.encode(5)).toEqual("f");
    expect(t.encode(24)).toEqual("y");
    expect(t.encode(26)).toEqual("A");
    expect(t.encode(40)).toEqual("O");
    expect(t.encode(50)).toEqual("Y");
    expect(t.encode(60)).toEqual("8");
    expect(t.encode(61)).toEqual("9");
    expect(t.encode(62)).toEqual("ba");
    expect(t.encode(63)).toEqual("bb");

    done();
  } catch (e) {
    done(String(e));
  }
});
it("alphaid decode", (done) => {
  try {
    const t = alphaid("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

    expect(t.decode(t.encode(5))).toEqual(5);
    expect(t.decode(t.encode(50))).toEqual(50);
    expect(t.decode(t.encode(150))).toEqual(150);

    expect(t.encode(54783927584325904378)).toEqual("bdq68g7tM4aa");

    expect(t.decode("bdq68g7tM4aa")).toEqual(54783927584325904378);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("alphaid decode 0", (done) => {
  try {
    const t = alphaid("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

    expect(t.decode("")).toEqual(0);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("alphaid decode a", (done) => {
  try {
    const t = alphaid("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

    expect(t.decode("a")).toEqual(0);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("alphaid basic ab", (done) => {
  try {
    const t = alphaid("01");

    expect(t.encode(0)).toEqual("0");
    expect(t.encode(1)).toEqual("1");
    expect(t.encode(2)).toEqual("10");
    expect(t.encode(3)).toEqual("11");
    expect(t.encode(4)).toEqual("100");
    expect(t.encode(5)).toEqual("101");
    expect(t.encode(24)).toEqual("11000");
    expect(t.encode(26)).toEqual("11010");
    expect(t.encode(40)).toEqual("101000");
    expect(t.encode(50)).toEqual("110010");
    expect(t.encode(60)).toEqual("111100");
    expect(t.encode(61)).toEqual("111101");
    expect(t.encode(62)).toEqual("111110");
    expect(t.encode(63)).toEqual("111111");

    done();
  } catch (e) {
    done(String(e));
  }
});

it("alphaid basic ab rev", (done) => {
  try {
    const t = alphaid("01");

    expect(t.decode(t.encode(0))).toEqual(0);
    expect(t.decode(t.encode(1))).toEqual(1);
    expect(t.decode(t.encode(2))).toEqual(2);
    expect(t.decode(t.encode(3))).toEqual(3);
    expect(t.decode(t.encode(4))).toEqual(4);
    expect(t.decode(t.encode(5))).toEqual(5);
    expect(t.decode(t.encode(24))).toEqual(24);
    expect(t.decode(t.encode(26))).toEqual(26);
    expect(t.decode(t.encode(40))).toEqual(40);
    expect(t.decode(t.encode(50))).toEqual(50);
    expect(t.decode(t.encode(60))).toEqual(60);
    expect(t.decode(t.encode(61))).toEqual(61);
    expect(t.decode(t.encode(62))).toEqual(62);
    expect(t.decode(t.encode(63))).toEqual(63);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("alphaid basic", (done) => {
  try {
    const t = alphaid("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_");

    expect(t.encode(0)).toEqual("A");
    expect(t.encode(1)).toEqual("B");
    expect(t.encode(2)).toEqual("C");
    expect(t.encode(3)).toEqual("D");
    expect(t.encode(4)).toEqual("E");
    expect(t.encode(5)).toEqual("F");
    expect(t.encode(24)).toEqual("Y");
    expect(t.encode(26)).toEqual("a");
    expect(t.encode(40)).toEqual("o");
    expect(t.encode(50)).toEqual("y");
    expect(t.encode(60)).toEqual("8");
    expect(t.encode(61)).toEqual("9");
    expect(t.encode(62)).toEqual("-");
    expect(t.encode(63)).toEqual("_");
    expect(t.encode(64)).toEqual("BA");
    expect(t.encode(125)).toEqual("B9");
    expect(t.encode(126)).toEqual("B-");
    expect(t.encode(127)).toEqual("B_");
    expect(t.encode(128)).toEqual("CA");
    expect(t.encode(129)).toEqual("CB");
    expect(t.encode(64 * 64 - 1)).toEqual("__");
    expect(t.encode(64 * 64 * 64 - 1)).toEqual("___");
    expect(t.encode(64 * 64 * 64 * 64 - 1)).toEqual("____");
    expect(t.encode(64 * 64 * 64 * 64 * 64 - 1)).toEqual("_____");
    expect(t.encode(64 * 64 * 64 * 64 * 64 * 64 - 1)).toEqual("______");
    expect(t.encode(64 * 64 * 64 * 64 * 64 * 64 * 64 - 1)).toEqual("_______");
    expect(t.encode(64 * 64 * 64 * 64 * 64 * 64 * 64 * 64 - 1)).toEqual("________");

    done();
  } catch (e) {
    done(String(e));
  }
});
