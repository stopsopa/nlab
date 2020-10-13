
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

            t[i] = true;

            const r = f(...args);

            if (Object.keys(t).length === list.length) {

                setTimeout(callback, 0);
            }

            return r;
        });
    }

}());

module.exports = all;