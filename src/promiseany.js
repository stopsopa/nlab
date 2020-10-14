
function th(msg) {

    return new Error("promiseany error: " + msg);
}

function promiseany (list) {

    if ( ! Array.isArray(list) ) {

        throw th("list is not an array");
    }

    if ( list.length === 0 ) {

        throw th("list.length === 0");
    }

    var err = false

    for (var i = 0, l = list.length, t ; i < l ; i += 1 ) {

        t = list[i];

        if ( ! t || typeof t.then !== 'function' ) {

            err = th("list["+i+"] is not a promise");
        }
        else {

            t.then(() => {}, () => {});
        }
    }

    if (err) {

        throw err;
    }

    return new Promise((resolve, reject) => {

        var tmp = [];

        var max = 0;

        for (var i = 0, l = list.length ; i < l ; i += 1 ) {

            (function (i) {

                list[i].then(resolve, e => {

                    tmp[i] = e;

                    max += 1;

                    if (max === l) {

                        reject(tmp);
                    }
                });

            }(i))
        }
    });
}

module.exports = promiseany;

