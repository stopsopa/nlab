const trim = require("./trim");

/**
 * @doc https://github.com/stopsopa/nlab#alphaid
 */
const tool = (function () {
  const th = (msg) => new Error("alphaid.js error: " + msg);

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  const Cls = function (key) {
    if (typeof key !== "string") {
      throw th("given key is not a string");
    }

    key = trim(key);

    if (!key.length) {
      throw th("key is an empty string");
    }

    this.key = key;

    this.count = key.length;
  };

  Cls.prototype.encode = function (num) {
    if (!Number.isInteger(num)) {
      throw th("given num is not an integer");
    }

    let encoded = "";

    const c = this.key;

    const count = this.count;

    while (num >= count) {
      const div = parseInt(num / count, 10);

      encoded += c[num - count * div];

      num = div;
    }

    if (num) {
      encoded += c[num];
    }

    return reverseString(encoded) || this.key[0];
  };

  Cls.prototype.decode = function (alpha) {
    if (typeof alpha !== "string") {
      throw th("decode: alpha is not a string");
    }

    alpha = reverseString(alpha);

    let decoded = 0;

    let multi = 1;

    const c = this.key;

    const count = this.count;

    for (let i = 0, len = alpha.length; i < len; i += 1) {
      decoded += multi * c.indexOf(alpha[i]);

      multi *= count;
    }

    return decoded;
  };

  return function (key) {
    if (typeof key !== "string" || !key) {
      // https://webapps.stackexchange.com/a/101153
      key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Description
      // key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_AZaz09-_.!~*\\'()';
    }

    return new Cls(key);
  };
})();

module.exports = tool;
