[![Build Status](https://travis-ci.org/stopsopa/nlab.svg?branch=v0.0.28)](https://travis-ci.org/stopsopa/nlab)
[![npm version](https://badge.fury.io/js/nlab.svg)](https://badge.fury.io/js/nlab)
[![codecov](https://codecov.io/gh/stopsopa/nlab/branch/v0.0.28/graph/badge.svg)](https://codecov.io/gh/stopsopa/nlab/tree/v0.0.28)
[![NpmLicense](https://img.shields.io/npm/l/nlab.svg)](https://github.com/stopsopa/nlab/blob/master/LICENSE)

## Table of Contents

<!-- toc -->

- [Promise delay](#promise-delay)

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