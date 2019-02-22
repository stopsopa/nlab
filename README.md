[![Build Status](https://travis-ci.org/stopsopa/nlab.svg?branch=v0.0.28)](https://travis-ci.org/stopsopa/nlab)
[![npm version](https://badge.fury.io/js/nlab.svg)](https://badge.fury.io/js/nlab)
[![codecov](https://codecov.io/gh/stopsopa/nlab/branch/v0.0.28/graph/badge.svg)](https://codecov.io/gh/stopsopa/nlab/tree/v0.0.28)
[![NpmLicense](https://img.shields.io/npm/l/nlab.svg)](https://github.com/stopsopa/nlab/blob/master/LICENSE)

## Table of Contents

<!-- toc -->

- [debugging](#debugging)
- [console](#console)
- [readding closest .env](#readding-closest-env)
- [determining "dev" || "prod"](#determining-dev--prod)
- [express response extensions:](#express-response-extensions)
- [access to request & response in react component (SSR):](#access-to-request--response-in-react-component-ssr)
- [Get client ip address](#get-client-ip-address)
- [RESTful api (transport)](#restful-api-transport)
- [Controllers](#controllers)
- [JWT security](#jwt-security)
  * [access to JWT payload in the controller](#access-to-jwt-payload-in-the-controller)
  * [Router](#router)
- [Ping endpoint is](#ping-endpoint-is)
- [Semantic UI helpers](#semantic-ui-helpers)
  * [Button as a Router Link](#button-as-a-router-link)
  * [Button as a regular link](#button-as-a-regular-link)
- [Extra tools](#extra-tools)

<!-- tocstop -->

_(TOC generated using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_


# Promise delay

```javascript
const delay = require('nlab/delay');

delay(3000, 'ok')
    .then(data => console.log('then: ', data))
;
// prints 'then:  ok' after 3 sek
```

```javascript
const delay = require('nlab/delay');

Promise.resolve()
    .then(
        () => delay(3000, 'all good'),
        () => delay.reject(3000, 'error')
    )
    .then(
        ok => console.log('ok:', ok),
        error => console.log('catch:', error)
    )
;    
// ok: all good
```

```javascript
const delay = require('nlab/delay');

Promise.reject()
    .then(
        () => delay(3000, 'all good'),
        () => delay.reject(3000, 'error')
    )
    .then(
        ok => console.log('ok:', ok),
        error => console.log('catch:', error)
    )
;    
// catch: error
```

```javascript
const then = require('nlab/delay').then;

Promise.resolve('resolved')
    .then(...then(1000))
    .then(data => console.log('then:', data))
;
// then: rejected - after 1 sec

Promise.reject('rejected')
    .then(...then(1000))
    .catch(data => console.log('catch:', data))
;
// catch: rejected - after 1 sec
```

```javascript
import delay from 'nlab/delay';

(async function () {

    console.log('start');

    await delay(1000);

    console.log('end')
}());

// start
// end - after 1 sec
```