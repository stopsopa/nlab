
/**
 * https://www.npmjs.com/package/detect-node
 */
module.exports = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';
