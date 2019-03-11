
const isObject  = require('./isObject');

const isArray   = require('./isArray');

const isDate    = require('./isDate');

const prepareToStamp = data => {

    if ( typeof data === 'string' ) {

        return data;
    }

    if ( typeof data === 'function' ) {

        return data.toString();
    }

    if ( isDate(data) ) {

        return data.toISOString();
    }

    if ( isArray(data) ) {

        return data.map(prepareToStamp);
    }

    if ( isObject(data) ) {

        let keys = Object.keys(data);

        keys.sort();

        return keys.reduce((acc, key) => {

            acc[key] = prepareToStamp(data[key]);

            if ( acc[key] == undefined ) {

                acc[key] = 'undefined';
            }

            return acc;
        }, {});
    }

    return data;
};

module.exports = prepareToStamp;

