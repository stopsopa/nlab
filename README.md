[![Build Status](https://travis-ci.org/stopsopa/nlab.svg?branch=v0.0.60)](https://travis-ci.org/stopsopa/nlab)
[![npm version](https://badge.fury.io/js/nlab.svg)](https://badge.fury.io/js/nlab)
[![codecov](https://codecov.io/gh/stopsopa/nlab/branch/v0.0.60/graph/badge.svg)](https://codecov.io/gh/stopsopa/nlab/tree/v0.0.60)
[![NpmLicense](https://img.shields.io/npm/l/nlab.svg)](https://github.com/stopsopa/nlab/blob/master/LICENSE)

# Table of Contents

<!-- toc -->

- [Promise delay](#promise-delay)
- [promiseall](#promiseall)
- [isObject()](#isobject)
- [isArray()](#isarray)
- [isDate()](#isdate)
- [trim()](#trim)
- [xor](#xor)
- [aes256](#aes256)
- [color](#color)
- [get](#get)
- [set](#set)
- [pregQuote](#pregquote)
- [incrementSlug](#incrementslug)
- [ms](#ms)
- [cachePromiseInterval](#cachepromiseinterval)

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
        data => delay(3000, data),
        data => delay.reject(3000, data)
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
        data => delay(3000, data),
        data => delay.reject(3000, data)
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

const { then } = require('nlab/delay');

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

Use of *delay()* with es6:

```javascript
import delay from 'nlab/delay';

const delay = require('nlab/delay');

(async function () {

    console.log('start');

    await delay(1000);

    console.log('end')
}());

// 'start'
// 'end' - after 1 sec
```

# promiseall

Works like Promise.all but when one or more promises in array are rejected, it will still wait for all other promises to resolve or reject ( to finish their job ), and return array like:



```javascript

const promiseall = require('nlab/promiseall');

import promiseall from 'nlab/promiseall';

const list = promiseall([/* ... array of promises to wait ... */]);

// example response (if at least one promise is rejected)

[
    {
        resolved: true,
        data: '...'
    },
    {
        resolved: true,
        data: '...'
    },
    {
        resolved: false,
        data: '...'
    },
    {
        resolved: true,
        data: '...'
    },
]
```

If all promises are resolved then there is not difference in behaviour from native Promise.all().
It just return array of payloads from those resolved promises.

promiseall in this variant is designed to address some particular issues with race condition

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
//  ✓isObject - null                                                -> false
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
//  ✓isArray - null                                                -> false
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
//  ✓isDate - null                                                -> false
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

# xor

```javascript

import xor from 'nlab/xor';

const key = 'mysecret key';

const data = 'my data';

if (xor(xor(data, key), key) === data) {
    // true
}

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

# pregQuote

Function to prefix in regex reserved characters.

```javascript

import pregQuote from 'nlab/pregQuote';
// or 
// const pregQuote = require('nlab/pregQuote');

pregQuote('test'); // 'test'
pregQuote('test[]test'); // 'test\[\]test'
pregQuote('t?e(st'); // 't\?es\(t'
```

# incrementSlug

Function to generate next possible value in db for unique key column. 
(In order to use it it's necessary to find 'last/biggest' slug in column):

```jsx
import incrementSlug from 'nlab/incrementSlug';

import slugify from 'nlab/slugify';

const title = '....';

const prefix = slugify(title, {lower: true})

let newSlug = prefix;

let lastSlug = await this.queryColumn(debug, trx, `SELECT slug FROM :table: WHERE slug LIKE :slug ORDER BY slug desc limit 1`, {
    slug: prefix + '%',
});

if (lastSlug) {

    nextSlug = incrementSlug(lastSlug);
}

return nextSlug

```

```javascript

import incrementSlug from 'nlab/incrementSlug';
// or 
// const incrementSlug = require('nlab/incrementSlug');

incrementSlug('test'); // 'test-1'
incrementSlug('test-30'); // 'test-31'
incrementSlug('test-30', '_'); // 'test-30_1'
incrementSlug('test_30', '_'); // 'test-31'
```

# ms

Generate human readable version of time left based on given number of miliseconds (or other unit);

```javascript

import ms from 'nlab/ms';

const ms        = require('nlab/ms');

const generate  = ms.generate;

const raw       = ms.raw;

console.log(ms(89754389233)) // number of miliseconds
// 2y 308d 19h 46m 29s 233ms

console.log(ms(89754389)) // number of miliseconds
// 1d 55m 54s 389ms

console.log(ms(89754389, 's')) // number of seconds
// 2y 308d 19h 46m 29s
// other units m,h,d,y - default 'ms'

console.log(ms(89754389, {
    unit: 's',
    dict: {
        ms: ' ms',
        s: ' sec',
        m: ' min',
        h: ' hours',
        d: ' days',
        y: ' years',
    }
}))
// 2 years 308 days 19 hours 46 min 29 sec

const k = generate({
    ms: 45,
    s: 46,
    m: 47,
    h: 4,
    d: 3,
    y: 2,
});

console.log(k) // 63348466045

console.log(ms(k)) // 2y 3d 4h 47m 46s 45ms

console.log(JSON.stringify(raw(k)))
// {"ms":45,"s":46,"m":47,"h":4,"d":3,"y":2}


```




# cachePromiseInterval

Library for caching data and refreshing it periodicly using given async function to get the cache content,
it is possible to cache multiple sets of data based on unique set of input arguments.
If new set arguments appear then it will fetch data on demand.

```javascript

import cachePromiseInterval from 'nlab/cachePromiseInterval';

const cachePromiseInterval  = require('nlab/cachePromiseInterval');

// example

const log = require('inspc');

const delay = require('nlab/delay');

const cache = cachePromiseInterval('separatebucket');

const fetch = (args, data) => {
    return cache({
        args,
        create: () => new Promise(res => {

            // console.log('fetch...')

            setTimeout(res, 20, `res: ${data}`);
        }),
        refreshinterval: 20
    });
};

(async function () {

    {
        const { data } = await fetch(['arg'], 'dd');

        console.log(`data: ${data}`); // data: res: dd
    }

    {
        // will server data from cache because args are the same
        const { data } = await fetch(['arg'], 'ddd');

        console.log(`data: ${data}`); // data: res: dd
    }

    process.exit(0);

}());

// end of case 1

(async function () {

    {
        const { data } = await fetch(['arg'], 'dd');

        console.log(`data: ${data}`); // data: res: dd
    }

    {
        // arguments has changed so create will be called for this set of arguments
        // and it will return different data
        const { data } = await fetch(['arg', 'arg2'], 'ddd');

        console.log(`data: ${data}`); // data: res: ddd
    }

    process.exit(0);

}());

// end of case 2

// first failed cache will crash server (process.exit(1)) if create return rejected promise
// it means library can't populate cache for this case
const fetchCrash = (args, data) => {
    return cache({
        args,
        // firstcrach: true, it is true by defualt
        create: () => new Promise((res, rej) => {

            // console.log('fetch...')

            setTimeout(rej, 20, `rej: ${data}`);
        }),
        refreshinterval: 20
    });
};

(async function () {

    {
        const { data } = await fetchCrash(['arg'], 'dd');

        console.log(`data: ${data}`); // data: res: dd
    }

    // Object {
    //     <key> [String]: >separatebucket< len: 14
    //     <ckey> [String]: >separatebucket_9b6bc915ce444bab0f263ac01bfb83b14c5a13d0351b22a7e5c748a6d594144f< len: 79
    //     <catch> [String]: >cachePromiseInterval error: promise catch< len: 41
    //     <o> Object {
    //     <args> Array [
    //         <0> [String]: >arg< len: 3
    //     ]
    //     <create> [Function]: ><
    //     <refreshinterval> [Integer]: >20<
    //         <firstcrach> [Boolean]: >true<
    //     }
    //     <e> [String]: >rej: dd< len: 7
    //     <firstcrach> [Undefined]: >undefined<
    // }

    // server will exit with status code: 1

}());

// end of case 3

// first failed cache will crash server (process.exit(1)) if create return rejected promise
// it means library can't populate cache for this case
const fetchCrash2 = (args, data) => {
    return cache({
        args,
        firstcrach: false, // it is true by defualt
        create: () => new Promise((res, rej) => {

            // console.log('fetch...')

            setTimeout(rej, 20, `rej: ${data}`);
        }),
        refreshinterval: 200
    });
};

(async function () {

    try {

        const { data } = await fetchCrash2(['arg'], 'dd');
    }
    catch (e) {

        log.dump({
            catch_error: e, // rej: dd
        })
    }

    try {

        const { data } = await fetchCrash2(['arg'], 'ddd');
    }
    catch (e) {

        log.dump({
            catch_error2: e, // rej: dd - the same value
        })
    }

    // It will just try and try to fetch it every interval given in refreshinterval
    // Object {
    //     <key> [String]: >separatebucket< len: 14
    //     <ckey> [String]: >separatebucket_9b6bc915ce444bab0f263ac01bfb83b14c5a13d0351b22a7e5c748a6d594144f< len: 79
    //     <error> [String]: >o.refreshinterval next call error< len: 33
    //     <e> [String]: >rej: dd< len: 7
    // }

    // server will not crush
}());

// end of case 4


```



