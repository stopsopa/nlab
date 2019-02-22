
'use strict';

/**
 * import delay from 'nlab/delay'
 * or
 * const delay require('nlab/delay');
 *
 * await delay(4000)
 *
 * or:
 *
    delay(3000, 'ok')
        .then(data => log('then: ', data))
    ;

 */
const resolve = (time, data) =>
    new Promise(
        resolve => time ? setTimeout(resolve, time, data) : resolve(data)
    )
;

const delay = (time, ...rest) => {

    if (rest.length) {

        return resolve(time, rest[0]);
    }

    return data => resolve(time, data);
}
/**
 * import delay from 'nlab/delay'
 * or
 * const delay require('nlab/delay');
 *
    return Promise.resolve()
        .then(
            () => delay(3000, 'ok'),
            () => delay.reject(3000, 'error')
        )

 */
const reject = (time, data) =>
    new Promise(
        (resolve, reject) => time ? setTimeout(reject, time, data) : reject(data)
    )
;

const delayReject = (time, ...rest) => {

    if (rest.length) {

        return reject(time, rest[0]);
    }

    return data => reject(time, data);
}

/**
 * import { then } from 'nlab/delay'
 * or
 * const then = require('nlab/delay').then;
 *
 * Promise.reject('test')
 *     .then(...then(1000))
 *     .catch(data => console.log(data))
 * ;
 * Promise.resolve('test')
 *     .then(...then(1000))
 *     .then(data => console.log(data))
 * ;
 * @param time
 */

const then = time => ([
    delay(time),
    delay.reject(time),
]);

delay.reject    = delayReject;

delay.then      = then;

module.exports = delay;
