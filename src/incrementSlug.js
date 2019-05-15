
const pregQuote = require('./pregQuote');

const incrementSlug = function (slug, delimiter = '-') {

    if ( typeof slug !== 'string' ) {

        throw new Error(`nlab: incrementSlug: slug is not a string`);
    }

    if ( ! slug.trim() ) {

        throw new Error(`nlab: incrementSlug: slug is an empty string`);
    }

    if ( typeof delimiter !== 'string' ) {

        throw new Error(`nlab: incrementSlug: delimiter is not a string`);
    }

    if ( delimiter.trim().length !== 1 ) {

        throw new Error(`nlab: incrementSlug: delimiter should containe only one character it contains: '${delimiter}'`);
    }

    const qdel = pregQuote(delimiter);

    const reg = new RegExp('^(.*)' + qdel + '(\\d+)$');

    const match = slug.match(reg);

    if (match) {

        if ( (parseInt(match[2] + '', 10) + '') !== match[2]) {

            throw new Error(`nlab: incrementSlug: found number sufix can't be incremented, the raw sufix is: '${match[2]}'`);
        }

        return match[1] + delimiter + (parseInt(match[2], 10) + 1);
    }

    return slug + delimiter + '1';
};

module.exports = incrementSlug;