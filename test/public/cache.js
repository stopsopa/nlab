
const promiseCache = require('../../src/promiseCache');

const {
    prepareToStamp,
    throttle,
    nowHR,
    now,
} = promiseCache;

const cache = throttle(1, 10 * 1000);

module.exports = cache;




