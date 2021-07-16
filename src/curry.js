
module.exports = fn => {

    if ( typeof fn !== 'function' ) {

        throw new Error(`curry.js error: fn is not a function`);
    }

    let buff = [];

    const pass = (...args) => {

        buff = buff.concat(args);

        if (fn.length > buff.length) {

            return pass;
        }

        return fn.apply(this, buff);
    }

    return pass;
}