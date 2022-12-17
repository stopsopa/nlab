// @doc https://github.com/stopsopa/nlab#isarray

//  ✓isObject - []                                                  -> false
//  ✓isObject - {}                                                  -> false
//  ✓isObject - using with object that have implemented toString()  -> false
//  ✓isObject - extended object                                     -> false
//  ✓isObject - new function () {}                                  -> false
//  ✓isObject - function () {}                                      -> false
//  ✓isObject - async function () {}                                -> true
//  ✓isObject - () => {}                                            -> false
//  ✓isObject - true                                                -> false
//  ✓isObject - false                                               -> false
//  ✓isObject - NaN                                                 -> false
//  ✓isObject - undefined                                           -> false
//  ✓isObject - no arg                                              -> false
//  ✓isObject - 4                                                   -> false
//  ✓isObject - string                                              -> false
//  ✓isObject - Symbol('test')                                      -> false

function isAsyncFunction(fn) {
  try {
    return fn.constructor.name === "AsyncFunction";
  } catch (e) {}

  return false;
}

module.exports = isAsyncFunction;
