/**
 * @doc https://github.com/stopsopa/nlab#isdate
 */
module.exports = function (o) {
    return Object.prototype.toString.call(o) === '[object Date]';
}