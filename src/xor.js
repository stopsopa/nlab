/**
 * @doc https://github.com/stopsopa/nlab#xor
 */
function xor(data, key) {
  if (typeof key !== "string") {
    throw new Error(`xor.js: key is not a string`);
  }

  if (!key) {
    throw new Error(`xor.js: key is an empty string`);
  }

  if (typeof data !== "string") {
    throw new Error(`xor.js: data is not a string`);
  }

  var ret = "",
    l = key.length;

  for (var i = 0; i < data.length; i++) {
    ret += String.fromCharCode(key.charCodeAt(i % l) ^ data.charCodeAt(i));
  }

  return ret;
}

module.exports = xor;
