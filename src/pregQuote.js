
'use strict';

/**
 * @doc https://github.com/stopsopa/nlab#pregquote
 *
 * Logic based on https://www.npmjs.com/package/escape-string-regexp
 */
var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

function pregQuote(str) {

    if (typeof str !== 'string') {

        return false;
    }

    return str.replace(matchOperatorsRe, '\\$&');
};

module.exports = pregQuote;

