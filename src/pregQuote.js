
'use strict';

/**
 * @doc https://github.com/stopsopa/nlab#pregquote
 *
 * Logic based on https://www.npmjs.com/package/escape-string-regexp
 *
 * Compare later with: https://hapi.dev/module/hoek/api/?v=10.0.1#escaperegexstring
 *                      this one will lead to: https://github.com/hapijs/hoek/blob/9b43e1857c6b3f3ae774286f034a39be83e1b7a0/lib/escapeRegex.js 
 *        /[\^\$\.\*\+\-\?      \|\\  \(\)\{\}\{\}  ]/g - nlab
 *        /[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, - there is more in hapi
 
 *    and check also: https://github.com/remix-run/react-router/blob/1ca0e8f6dbb4f02874183dadd6b2481a6d599008/packages/react-router-dom/modules/NavLink.js#L57
 */
//var matchOperatorsRe = /[|\\{}()[\]^$+*?.-]/g;
var matchOperatorsRe = /[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g;

function pregQuote(str) {

    if (typeof str !== 'string') {

        return false;
    }

    return str.replace(matchOperatorsRe, '\\$&');
};

module.exports = pregQuote;

