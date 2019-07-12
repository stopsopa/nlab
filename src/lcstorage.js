
const node = require('./isNode');

const trim = require('./trim');

module.exports = {
    set: function (key, value, thrw = null) {

        if ( ! node ) {

            try {

                localStorage.setItem(key, JSON.stringify(value));
            }
            catch (e) {

                error(`set`, e, thrw);
            }
        }

        return this;
    },
    get: function (...args) {

        const [key, def, thrw = null] = args;

        if ( ! node ) {

            try {

                const data = localStorage.getItem(key);

                if ( data === null ) {

                    return def;
                }

                try {

                    return JSON.parse(data);
                }
                catch (e) {

                    return data;
                }
            }
            catch (e) {

                error(`get`, e, thrw);
            }
        }

        return def;
    },
    has: function (key, thrw = null) {

        if (typeof key !== 'string') {

            error(`has`, 'key must be a string', thrw);
        }

        if (trim(key)) {

            error(`has`, 'key must be a string', thrw);
        }

        if ( ! node ) {

            try {

                return this.keys().includes(key);
            }
            catch (e) {

                error(`has`, e, thrw);
            }
        }

        return false;
    },
    clear: function (thrw = null) {

        if ( ! node ) {

            try {

                localStorage.removeItem(key);
            }
            catch (e) {

                error(`rm`, e, thrw);
            }
        }

        return this;
    },
    rm: function (key, thrw = null) {

        if ( ! node ) {

            try {

                localStorage.removeItem(key);
            }
            catch (e) {

                error(`rm`, e, thrw);
            }
        }

        return this;
    },
    keys: function (def = [], thrw = null) {

        if ( ! node ) {

            try {

                let list = [];

                for ( let i = 0, l = localStorage.length, t ; i < l ; i += 1 ) {

                    t = localStorage.key(i);

                    if ( typeof t === 'string' ) {

                        t = trim(t);

                        if (t) {

                            list.push(t);
                        }
                    }
                }

                return list;
            }
            catch (e) {

                error(`keys`, e, thrw);
            }
        }

        return def;
    },
    node,
};

function error(prefix, msg, thrw) {

    msg = String(msg);

    msg = `lcstorage.js:${prefix} error: ${msg}`;

    if (thrw) {

        throw new Error(msg);
    }

    (thrw !== null) && console && console.log && console.log(msg);
}
