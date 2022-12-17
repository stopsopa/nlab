"use strict";

/**
 * Not needed since node v16
 
// https://nodejs.org/api/timers.html#timers_timerspromises_settimeout_delay_value_options  
// import {setTimeout} from "timers/promises";
const { setTimeout } = require('timers/promises')

async function demoNew() {
  
  await setTimeout(5000);
  
  console.log("Timer expired.");
}

(async function () {

  await demoNew();
}())

 */

// see also https://nodejs.org/api/timers.html#timers_timers_promises_api

/**
 * @doc https://github.com/stopsopa/nlab#promise-delay
 *
 * import delay from 'nlab/delay'
 *     or
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
const delay = (time, data) =>
  new Promise((resolve) =>
    time ? setTimeout(resolve, time, data) : resolve(data)
  );
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
  new Promise((resolve, reject) =>
    time ? setTimeout(reject, time, data) : reject(data)
  );
/**
 * import { then } from 'nlab/delay'
 *     or
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

const then = (time) => [
  (data) => delay(time, data),
  (data) => delay.reject(time, data),
];

delay.reject = reject;

delay.then = then;

module.exports = delay;
