[![Build Status](https://travis-ci.org/stopsopa/nlab.svg?branch=v0.0.30)](https://travis-ci.org/stopsopa/nlab)
[![npm version](https://badge.fury.io/js/nlab.svg)](https://badge.fury.io/js/nlab)
[![codecov](https://codecov.io/gh/stopsopa/nlab/branch/v0.0.30/graph/badge.svg)](https://codecov.io/gh/stopsopa/nlab/tree/v0.0.30)
[![NpmLicense](https://img.shields.io/npm/l/nlab.svg)](https://github.com/stopsopa/nlab/blob/master/LICENSE)

## Table of Contents

<!-- toc -->

- [Promise delay](#promise-delay)
- [isObject()](#isobject)

<!-- tocstop -->

_(TOC generated using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_


# Promise delay

```javascript
const delay = require('nlab/delay');

delay(3000, 'ok')
    .then(data => console.log('then:', data))
;
// prints 'then: ok' after 3 sek
```

```javascript
const delay = require('nlab/delay');

Promise.resolve('all good')
    .then(
        delay(3000),
        delay.reject(3000)
    )
    .then(
        ok => console.log('ok:', ok),
        error => console.log('catch:', error)
    )
;    
// 'ok: all good' - after 3 sec
```

```javascript
const delay = require('nlab/delay');

Promise.reject('all wrong')
    .then(
        delay(3000),
        delay.reject(3000)
    )
    .then(
        ok => console.log('ok:', ok),
        error => console.log('catch:', error)
    )
;    
// 'catch: all wrong' - after 3 sec
```

```javascript
const then = require('nlab/delay').then;

Promise.resolve('resolved')
    .then(...then(1000))
    .then(data => console.log('then:', data))
;
// 'then: resolved' - after 1 sec

Promise.reject('rejected')
    .then(...then(1000))
    .catch(data => console.log('catch:', data))
;
// 'catch: rejected' - after 1 sec
```

```javascript
import delay from 'nlab/delay';

(async function () {

    console.log('start');

    await delay(1000);

    console.log('end')
}());

// 'start'
// 'end' - after 1 sec
```

# isObject()

It's more strict method to test if given arg is an object - more strict than implementation from lodash or underscore.js


```javascript
//  ✓isObject - {}                                                  -> true
//  ✓isObject - using with object that have implemented toString()  -> true
//  ✓isObject - extended object                                     -> true
//  ✓isObject - new function () {}                                  -> true
//  ✓isObject - []                                                  -> false
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
```
To se more details about what is considired an object and what is not see test cases coverage for this file:

- [tests](https://github.com/stopsopa/nlab/blob/master/test/nlab/isObject.test.js)
- [coverage](https://codecov.io/gh/stopsopa/nlab/src/v0.0.29/src/isObject.js)

# isArray()

It's actually *Array.isArray* with MDN polyfill.

```javascript
//  ✓isArray - []                                                  -> true
//  ✓isArray - {}                                                  -> false
//  ✓isArray - using with object that have implemented toString()  -> false
//  ✓isArray - extended object                                     -> false
//  ✓isArray - new function () {}                                  -> false
//  ✓isArray - function () {}                                      -> false
//  ✓isArray - () => {}                                            -> false
//  ✓isArray - true                                                -> false
//  ✓isArray - false                                               -> false
//  ✓isArray - NaN                                                 -> false
//  ✓isArray - undefined                                           -> false
//  ✓isArray - no arg                                              -> false
//  ✓isArray - 4                                                   -> false
//  ✓isArray - string                                              -> false
//  ✓isArray - Symbol('test')                                      -> false
```







