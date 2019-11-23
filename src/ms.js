
const log = require('inspc');

function th(msg) {

    throw new Error("nlab/ms library error: " + String(msg));
}

var dividers = {
    ms: 1,
    s: 1000,
    m: 60,
    h: 60,
    d: 24,
    y: 365,
}

var shift = {
    ms: 1000,
    s: 60,
    m: 60,
    h: 24,
    d: 365,
    // y: 365,
}

var keys          = Object.keys(dividers);

var dict = keys.reduce((acc, key) => {
    acc[key] = key;
    return acc;
}, {});

function ms(time, opt) {

    if (typeof time !== 'number') {

        throw th("time is not a number");
    }

    if (typeof opt === 'string') {

        opt = {
            s: opt,
        }
    }

    opt = Object.assign({
        s: 'ms',
    }, opt);

    if ( keys.indexOf(opt.s) === -1 ) {

        throw th("opt '" + opt.s + "' is string but it is not on the list: '" + keys.join(', ') + "'");
    }

    opt.dict = Object.assign(dict, opt.dict || {});

    var list = keys.slice(keys.indexOf(opt.s));

    var ret = {
        ms: 0,
        s: 0,
        m: 0,
        h: 0,
        d: 0,
        y: 0,
    };

    // function msToTime(duration) {
    //     var milliseconds = parseInt((duration % 1000) / 100),
    //         seconds = Math.floor((duration / 1000) % 60),
    //         minutes = Math.floor((duration / (1000 * 60)) % 60),
    //         hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    //
    //     hours = (hours < 10) ? "0" + hours : hours;
    //     minutes = (minutes < 10) ? "0" + minutes : minutes;
    //     seconds = (seconds < 10) ? "0" + seconds : seconds;
    //
    //     return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    // }

    var div, unit;
    for ( var i = 0, l = list.length ; i < l ; i += 1 ) {

        unit = list[i];

        div = dividers[unit];

        // ret[unit] = parseInt( time %  , 10);

    }


    return opt;
}

function generate(opt, unit) {

    if (typeof unit !== 'string') {

        unit = 'ms';
    }

    if ( ! dividers[unit] ) {

        throw th(`generate: unknown unit (${unit}), valid units are: '${keys.join(', ')}'`);
    }

    var t = 0;

    Object.keys(opt).forEach(k => {

        if (k === 'ms') {

            t += opt[k];

            return;
        }

        if (dividers[k]) {

            var tt = 1;

            keys.slice(0, keys.indexOf(k)).forEach(kk => {

                tt *= shift[kk];
            });

            tt *= opt[k];

            t += tt;
        }
    });

    if (unit !== 'ms') {

        keys.slice(0, keys.indexOf(unit)).forEach(u => {

            t = parseInt(t / shift[u], 10);
        })
    }

    return t;
}

ms.generate = generate;

module.exports = ms;

