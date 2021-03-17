
'use strict';

const trim = require('./trim');

const th = msg => new Error(`negotiatePort error: ${msg}`);

/**
 * @doc https://github.com/stopsopa/nlab#negotiatePort
 */
const negotiatePort = function (protocol, port, prefix) {

    if (typeof protocol !== 'string') {

        throw th(`protocol '${protocol}' is not a string`);
    }

    protocol = trim(protocol, '/:');

    protocol = protocol.toLowerCase();

    if ( ! /^https?$/.test(protocol) ) {

        throw th(`protocol '${protocol}' don't match /^https?$/`);
    }

    if (port === undefined) {

        return '';
    }

    if (port === '') {

        return '';
    }

    if ( ! /^\d+$/.test(port) ) {

        throw th(`port '${port}' is not a number`);
    }

    port = String(port);

    var ret = '';

    if (protocol === 'https') {

        if (port != 443) {

            ret = port;
        }
    }
    else {

        if (port != 80) {

            ret = port;
        }
    }


    if (ret) {

        if (typeof prefix === 'string') {

            return prefix + ret;
        }
    }

    return ret;
}

module.exports = negotiatePort;