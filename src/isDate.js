/**
 * @doc https://github.com/stopsopa/nlab#isdate
 */

function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
}

module.exports = isDate;
