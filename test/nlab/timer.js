
let cache = undefined;

function now() {

    return parseInt((new Date()).getTime(), 10);
}

function diff() {

    if ( cache === undefined ) {

        throw `cache not initialized`;
    }

    const d = now() - cache;

    cache = undefined;

    return d;
}

function start() {

    cache = now();
};

module.exports = {
    now,
    start,
    diff,
}