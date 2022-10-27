
'use strict';

/**
 * @doc https://github.com/stopsopa/nlab#pregquote
 *
 * Logic based on https://www.npmjs.com/package/escape-string-regexp
 *
 * Compare later with: https://hapi.dev/module/hoek/api/?v=10.0.1#escaperegexstring
 */
var matchOperatorsRe = /[|\\{}()[\]^$+*?.-]/g;

function pregQuote(str) {

    if (typeof str !== 'string') {

        return false;
    }

    return str.replace(matchOperatorsRe, '\\$&');
};

module.exports = pregQuote;

