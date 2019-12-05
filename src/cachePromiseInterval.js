
const log       = require('inspc');

const crypto    = require('crypto');

const ms        = require('../ms');

const isObject  = require('../isObject');

const msg       = m => `cachePromiseInterval error: ${m}`

const th        = m => new Error(msg(m));

const now       = () => (new Date()).getTime();

const cache     = {};

const tool      = key => {

    if ( typeof key !== 'string' ) {

        throw th(`key is not a string`);
    }

    if ( ! key.trim() ) {

        throw th(`key is an empty string`);
    }

    if ( ! isObject(cache[key]) ) {

        cache[key] = {};
    }

    return (opt = {}) => {

        const o = {
            args            : null,
            create          : null,
            refreshinterval : null,
            firstcrach      : true,
            ...opt,
        }

        let add = {};

        if (o.test) {

            add = {
                n: "\n\n\n\n\n\n",
            }
        }

        let ckey;

        try {

            if ( typeof o.create !== 'function' ) {

                throw th(`o.create is not a function`);
            }

            if ( typeof o.firstcrach !== 'boolean' ) {

                throw th(`o.firstcrach is not boolean`);
            }

            if ( ! Array.isArray(o.args) ) {

                throw th(`o.args is not an array`);
            }

            if ( o.refreshinterval !== false ) {

                if ( typeof o.refreshinterval !== 'number') {

                    throw th(`o.refreshinterval is not false nor number`);
                }

                if ( o.refreshinterval < 10 ) {

                    throw th(`o.refreshinterval is number but it is < than 10`);
                }
            }

            const sha256    = crypto.createHash('sha256');

            sha256.update(JSON.stringify(o.args));

            ckey = `${key}_${sha256.digest('hex')}`;

            if ( ! cache[key][ckey] ) {

                cache[key][ckey] = Promise.resolve(o.create(...o.args));

                cache[key][ckey].now = now();

                o.refreshinterval && (function () {

                    const loop = async () => {

                        try {

                            const p = await o.create(...o.args);

                            cache[key][ckey] = Promise.resolve(p);

                            cache[key][ckey].now = now();

                            // process.stdout.write("\n\n\n\n\n\n\nresolved\n\n\n\n\n\n\n");
                        }
                        catch (e) {

                            log.dump({
                                key,
                                ckey,
                                error: `o.refreshinterval next call error`,
                                e,
                                ...add,
                            }, 3);
                        }

                        cache[key][ckey].handler = setTimeout(loop, o.refreshinterval);
                    };

                    cache[key][ckey].handler = setTimeout(loop, o.refreshinterval);
                }());
            }

            return cache[key][ckey].then(data => {

                const ret = {};

                ret.last    = cache[key][ckey].now;

                ret.now     = now();

                ret.next    = 'populated once';

                if (o.refreshinterval) {

                    ret.next            = ret.last + o.refreshinterval;

                    ret.interval        = o.refreshinterval;

                    ret.intervalHuman   = ms(o.refreshinterval);

                    ret.left            = ret.next - ret.now;

                    ret.leftHuman       = ms(ret.left);
                }

                ret.data    = data;

                cache[key][ckey].firstcrach = true;

                return ret;

            }).catch(e => {

                log.dump({
                    key,
                    ckey,
                    catch: msg(`promise catch`),
                    o,
                    e,
                    firstcrach: cache[key][ckey].firstcrach,
                    ...add,
                }, 3)

                if ( cache[key][ckey].firstcrach !== true && o.firstcrach ) {

                    if (o.test) {

                        return Promise.reject(`<<2>>:${e}`);
                    }
                    else {

                        process.exit(1);
                    }
                }
                else {

                    throw e;
                }
            });
        }
        catch (e) {

            log.dump({
                key,
                ckey,
                catch: msg(`main catch`),
                o,
                e,
                ...add,
            }, 3)

            if ( o.firstcrach ) {

                if (o.test) {

                    return Promise.reject(`<<1>>:${e}`)
                }
                else {

                    process.exit(2);
                }
            }
            else {

                throw e;
            }
        }
    };
}

module.exports = tool;