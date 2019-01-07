
module.exports = function (o) {
    return Object.prototype.toString.call(o) === '[object Object]'; // better in node.js to dealing with RowDataPacket object

    // const a = function () {};
    // a.prototype.other = 'other';
    // const b = function (t) { this.id = t };
    // b.prototype = Object.create(a.prototype);
    // b.prototype.constructor = b;

    // WARNING: above EXTENDED OBJECT is an object according to this test
    // WARNING: array is not an object according to this
        // to summarize:
            // isObject([])                     -> false
            // isObject(() => {})               -> false
            // isObject(new b(1))               -> true     - better
            // isObject(new function () {})     -> true
            // isObject({})                     -> true
            // ALSO WORTH TO MENTION:
                // this function doesn't care if new b(1) has or not has 'toString' function implemented, so it's rather safe
}