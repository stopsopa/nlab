[![Build Status](https://travis-ci.org/stopsopa/nlab.svg?branch=v0.0.48)](https://travis-ci.org/stopsopa/nlab)
[![npm version](https://badge.fury.io/js/nlab.svg)](https://badge.fury.io/js/nlab)
[![codecov](https://codecov.io/gh/stopsopa/nlab/branch/v0.0.48/graph/badge.svg)](https://codecov.io/gh/stopsopa/nlab/tree/v0.0.48)
[![NpmLicense](https://img.shields.io/npm/l/nlab.svg)](https://github.com/stopsopa/nlab/blob/master/LICENSE)

# Table of Contents

<!-- toc -->

- [Promise delay](#promise-delay)
- [isObject()](#isobject)
- [isArray()](#isarray)
- [isDate()](#isdate)
- [trim()](#trim)
- [aes256](#aes256)
- [color](#color)
- [get](#get)
- [set](#set)

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

Use *wait()* with es6:

```javascript
import { wait } from 'nlab/delay';

(async function () {

    console.log('start');

    await wait(1000);

    console.log('end')
}());

// 'start'
// 'end' - after 1 sec
```

# isObject()

It's more strict method to test if given arg is an object - more strict than implementation from lodash or underscore.js


```javascript
import isObject from 'nlab/isObject';
// or 
// const isObject = require('nlab/isObject');

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
//  ✓isObject - new Date()                                          -> false
```
To se more details about what is considired an object and what is not see test cases coverage for this file:

- [tests](https://github.com/stopsopa/nlab/blob/master/test/nlab/isObject.test.js)
- [coverage](https://codecov.io/gh/stopsopa/nlab/src/v0.0.29/src/isObject.js)

# isArray()

It's actually *Array.isArray* with MDN polyfill.

```javascript
import isArray from 'nlab/isArray';
// or 
// const isArray = require('nlab/isArray');

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

# isDate()

```javascript
import isDate from 'nlab/isDate';
// or 
// const isDate = require('nlab/isDate');

//  ✓isDate - new Date()                                          -> true
//  ✓isDate - {}                                                  -> false
//  ✓isDate - using with object that have implemented toString()  -> false
//  ✓isDate - extended object                                     -> false
//  ✓isDate - new function () {}                                  -> false
//  ✓isDate - []                                                  -> false
//  ✓isDate - function () {}                                      -> false
//  ✓isDate - () => {}                                            -> false
//  ✓isDate - true                                                -> false
//  ✓isDate - false                                               -> false
//  ✓isDate - NaN                                                 -> false
//  ✓isDate - undefined                                           -> false
//  ✓isDate - no arg                                              -> false
//  ✓isDate - 4                                                   -> false
//  ✓isDate - string                                              -> false
//  ✓isDate - Symbol('test')                                      -> false
```

# trim()

```javascript
import trim from 'nlab/trim';
// or 
// const trim = require('nlab/trim');

/*!
 * direction : 'rl'|'r'|'l'   -->   (undefined => 'rl')
 * charlist  : (undefined => " \n")
 */
function trim(string, charlist, direction) { /* ... */ }
```

# aes256

```javascript

import aes256 from 'nlab/aes256';
// or 
// const aes256 = require('nlab/aes256');

const c = aes256(`password`);

let msg = `message `;

const enc = c.encrypt(msg);

const dec = c.decrypt(enc);

// dec === msg;
```
# color

```javascript

import c from 'nlab/colors';
// or 
// const c = require('nlab/colors');

const glossary = {
    Bright      : "\x1b[1m",
    Dim         : "\x1b[2m",
    Underscore  : "\x1b[4m",
    Blink       : "\x1b[5m",
    Reverse     : "\x1b[7m",
    Hidden      : "\x1b[8m",
    FgBlack     : "\x1b[30m",
    FgRed       : "\x1b[31m", // red
    FgGreen     : "\x1b[32m", // green
    FgYellow    : "\x1b[33m", // yellow
    FgBlue      : "\x1b[34m",
    FgMagenta   : "\x1b[35m", // magenta
    FgCyan      : "\x1b[36m", // cyan
    FgWhite     : "\x1b[37m",
    BgBlack     : "\x1b[40m",
    BgRed       : "\x1b[41m",
    BgGreen     : "\x1b[42m",
    BgYellow    : "\x1b[43m",
    BgBlue      : "\x1b[44m",
    BgMagenta   : "\x1b[45m",
    BgCyan      : "\x1b[46m",
    BgWhite     : "\x1b[47m",
    r           : "\x1b[31m", // red
    g           : "\x1b[32m", // green
    b           : "\x1b[34m", // blue
    y           : "\x1b[33m", // yellow
    m           : "\x1b[35m", // magenta
    c           : "\x1b[36m", // cyan
    reset       : "\x1b[0m",
};

console.log(c.r(`print in red`));
console.log(c.g(`print in green`));
console.log(c.BgGreen(`print in green`));

// or
c(`print`, `in`, `blue\n`, `b`); // last arg will be use to choose color
c(`print`, `in`, `green\n`, `g`);
// the difference is that it will also print it directly using one of
// console.log() - in browser
// process.stdout.write() - in node

```

![table of colors](https://i.imgur.com/mWzuQWP.png)

# get

```javascript
import get from 'nlab/get';
// or 
// const get = require('nlab/get');

const data = {
    one: {
        two: [
            {
                t: 'e',
            },
            {
                three: {
                    four: {
                        six: 'test'
                    }
                }                
            }
        ]
    }
}

console.log(get(data, 'one.two.1.three.four.six'));
// will print: 'test'

console.log(get(data, 'one.two.1.three'));
// // will print: { four: { six: 'test' } }
//
console.log(get(data));
// // will print: { one: { two: [ [Object], [Object] ] } }
//
console.log(get(data, 'one.two.1.nonexisting'));
// // will print: undefined
//
console.log(get(data, 'one.two.1.nonexisting', 'defvalifnotexist'));
// // will print: 'defvalifnotexist'
```

# set

```javascript
import set from 'nlab/set';
// or 
// const set = require('nlab/set');

let data = {one: 'two'}

set(data, 'three', 'four')
console.log(JSON.stringify(data));
// will print: {"one":"two","three":"four"}

set(data, 'three.a', 'four')
console.log(JSON.stringify(data));
// will print: {"one":"two","three":{"a":"four"}}
// -> string 'four' has been replaced with object {a:'four'}

set(data, 'six.seven.eight', 'nine');
console.log(JSON.stringify(data, null, 4));
// will print:
// {
//     "one": "two",
//     "three": {
//         "a": "four"
//     },
//     "six": {
//         "seven": {
//             "eight": "nine"
//         }
//     }
// }

set(data, 'three.bbb.ccc', 'ddd');
console.log(JSON.stringify(data, null, 4));
// will print:
// {
//     "one": "two",
//     "three": {
//         "a": "four",
//         "bbb": {
//             "ccc": "ddd"
//         }
//     },
//     "six": {
//         "seven": {
//             "eight": "nine"
//         }
//     }
// }


data = {one: 'two'}
set(data, 'arr', []);
console.log(JSON.stringify(data))
// will print: {"one":"two","arr":[]}

set(data, 'arr.', 'v1') // works like array.push();
console.log(JSON.stringify(data))
// will print: {"one":"two","arr":["v1"]}

set(data, 'arr.', 'v2')
console.log(JSON.stringify(data))
// will print: {"one":"two","arr":["v1","v2"]}

set(data, 'arr..a.b..c', 'v3');
console.log(JSON.stringify(data, null, 4));
// will print:
// {
//     "one": "two",
//     "arr": [
//         "v1",
//         "v2",
//         {
//             "a": {
//                 "b": [
//                     {
//                         "c": "v3"
//                     }
//                 ]
//             }
//         }
//     ]
// }
```



