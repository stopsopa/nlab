const throttlePromises = require("../../src/throttlePromises");

// const {
//     prepareToStamp,
//     throttle,
//     nowHR,
//     now,
// } = throttlePromises;

const cache = throttlePromises(1, 8);

module.exports = cache;

// const promiseCache = require('../../src/promiseCache');
//
// const {
//     prepareToStamp,
//     throttle,
//     nowHR,
//     now,
// } = promiseCache;
//
// const cache = throttle(1, 10 * 1000);
//
// module.exports = cache;
