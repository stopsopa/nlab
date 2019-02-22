[![npm version](https://badge.fury.io/js/nlab.svg)](https://badge.fury.io/js/nlab)
[![NpmLicense](https://img.shields.io/npm/l/nlab.svg)](https://github.com/stopsopa/nlab/blob/master/LICENSE)



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