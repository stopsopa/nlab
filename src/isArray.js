// @doc https://github.com/stopsopa/nlab#isarray

//  ✓isArray - []                                                  -> true
//  ✓isArray - {}                                                  -> false
//  ✓isArray - Object.create(null)                                 -> false
//  ✓isArray - using with object that have implemented toString()  -> false
//  ✓isArray - extended object                                     -> false
//  ✓isArray - new function () {}                                  -> false
//  ✓isArray - function () {}                                      -> false
//  ✓isArray - () => {}                                            -> false
//  ✓isArray - null                                                -> false
//  ✓isArray - true                                                -> false
//  ✓isArray - false                                               -> false
//  ✓isArray - NaN                                                 -> false
//  ✓isArray - undefined                                           -> false
//  ✓isArray - no arg                                              -> false
//  ✓isArray - 4                                                   -> false
//  ✓isArray - string                                              -> false
//  ✓isArray - Symbol('test')                                      -> false
//  ✓isArray - new Date()                                          -> false
//  ✓isArray - new Date()                                          -> false
//  ✓isArray - new Map()                                           -> false
//  ✓isArray - new Set()                                           -> false
//  ✓isArray - new Error()                                         -> false



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
