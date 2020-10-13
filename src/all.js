
var all = (function () {

    var th = function (msg) {

        new Error("all.js error: " + String(msg));
    };

    return function (list, callback) {

        if ( ! Array.isArray(list) ) {

            throw th("list is not an array")
        }

        if ( list.length === 0 ) {

            throw th("list can't be empty")
        }

        let t = {};

        return list.map((f, i) => (...args) => {

            if ( typeof f !== 'function' ) {

                throw th("element on the list number " + i + " is not a function");
            }

            t[i] = [f(...args)];

            if (Object.keys(t).length === list.length) {

                setTimeout(() => callback(Object.values(t).map(r => r.pop())), 0);
            }

            return t[i];
        });
    }

}());

module.exports = all;