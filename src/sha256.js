
const node = require('../isNode');

const sjcl = require('../node_modules/sjcl/sjcl.js');

let tool;

if (node) {

    const crypto = eval('require')('crypto');

    tool = str => {

        if ( typeof str !== 'string' ) {

            throw 'nlab:sha256 node: given value is not a string';
        }

        const hash = crypto.createHash('sha256');

        hash.update(str);

        return hash.digest('hex');
    };
}
else {

    tool = str => {

        if ( typeof str !== 'string' ) {

            throw 'nlab:sha256 browser: given value is not a string';
        }

        return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(str));
    };
}

module.exports = tool;