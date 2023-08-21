const generateSalt = require("../../generateSalt");

try {
  jest.setTimeout(100);
} catch (e) {}

it(`generateSalt - len`, (done) => {
  (async function () {
    const salt = generateSalt();

    expect(typeof salt).toEqual("string");

    expect(salt.length).toEqual(12);

    done();
  })();
});

it(`generateSalt - 1`, (done) => {
  (async function () {
    const salt = generateSalt(1);

    expect(typeof salt).toEqual("string");

    expect(salt.length).toEqual(1);

    done();
  })();
});

it(`generateSalt - false`, (done) => {
  (async function () {
    try {
      generateSalt(false);

      done("error");
    } catch (e) {
      expect(String(e)).toEqual("Error: generateSalt error: characters is not an integer");

      done();
    }
  })();
});

it(`generateSalt - -1`, (done) => {
  (async function () {
    try {
      generateSalt(-1);

      done("error");
    } catch (e) {
      expect(String(e)).toEqual("Error: generateSalt error: characters < 1");

      done();
    }
  })();
});
