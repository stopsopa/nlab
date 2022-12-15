// @doc https://github.com/stopsopa/nlab#isarray

//  ✓isObject - []                                                  -> true
//  ✓isObject - {}                                                  -> false
//  ✓isObject - using with object that have implemented toString()  -> false
//  ✓isObject - extended object                                     -> false
//  ✓isObject - new function () {}                                  -> false
//  ✓isObject - function () {}                                      -> false
//  ✓isObject - () => {}                                            -> false
//  ✓isObject - true                                                -> false
//  ✓isObject - false                                               -> false
//  ✓isObject - NaN                                                 -> false
//  ✓isObject - undefined                                           -> false
//  ✓isObject - no arg                                              -> false
//  ✓isObject - 4                                                   -> false
//  ✓isObject - string                                              -> false
//  ✓isObject - Symbol('test')                                      -> false

function isArray(o) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill
  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === "[object Array]";
    };
  }

  return Array.isArray(o);
}

module.exports = isArray;
