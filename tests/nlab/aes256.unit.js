const aes256 = require("nlab/aes256.js");

const unique = require("nlab/unique.js");

try {
  jest.setTimeout(100);
} catch (e) {}

it(`aes256 - simple`, (done) => {
  const c = aes256(`password`);

  const msg = `message`;

  const enc = c.encrypt(msg);

  const dec = c.decrypt(enc);

  expect(enc).not.toEqual(msg);

  expect(dec).toEqual(msg);

  done();
});

it(`aes256 - long`, (done) => {
  const c = aes256(`password`);

  let msg = `message `;

  for (let i = 0; i < 200000; i += 1) {
    msg += unique() + " ";
  }

  const enc = c.encrypt(msg);

  const dec = c.decrypt(enc);

  expect(enc).not.toEqual(msg);

  expect(dec).toEqual(msg);

  done();
});
